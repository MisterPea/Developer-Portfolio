import json
import math
import base64
from io import BytesIO
import sys
import time
from threading import Thread, Event
import blurhash
from PIL import Image


class CreateBlurHash:
    """
    Class that is able to cycle through images within a custom json file and generate blurhash-es
    """
    PATH = './public/workPagesContent.json'
    PATH_TO_IMAGE = './public/images/product_images/'
    proj_tot = 0
    curr_proj = 0
    img_tot = 0
    curr_img = 0

    def terminal_msg(self, complete):
        """
        Method to display progress within the terminal
        """
        animation = [
            '=    ', '==   ', '===  ', '==== ', '=====', ' ====', '  ===',
            '   ==', '    =', '   ==', '  ===', ' ====', '=====', '==== ',
            '===  ', '==   '
        ]
        while not complete.is_set():
            for frame in animation:
                sys.stdout.flush()
                current_str = 'Working on proj ' + str(
                    self.curr_proj) + ' of ' + str(
                        self.proj_tot) + '-img-' + str(
                            self.curr_img) + ' of ' + str(self.img_tot) + frame
                sys.stdout.write("\r" + current_str)
                sys.stdout.flush()
                time.sleep(0.25)

    def blur_data_to_base64(self, blur_hash,
                            width_ratio,
                            height_ratio,
                            size_multiple=40):
        """
        method to convert blur_hash string to a jpeg data url
        """
        size = {
            'w': int(math.trunc(width_ratio * size_multiple)),
            'h': int(math.trunc(height_ratio * size_multiple))
        }
        img = blurhash.decode(blur_hash, size['w'], size['h'], 1)
        img_byte_array = BytesIO()
        img.save(img_byte_array, format='JPEG', subsampling=0, quality=75)
        img_byte_array = img_byte_array.getvalue()
        base64_data = base64.b64encode(img_byte_array).decode('utf8')
        data_url = f"data:image/jpeg;base64,{base64_data}"
        return data_url

    def find_ratio(self, _h: int, _w: int):
        """
        convenience method that returns the h/w ratio with the larger be 1 and the smaller being a float.
        """
        larger = max(_h, _w)
        smaller = min(_h, _w)
        if _h > _w:
            return {'h': 1, 'w': 1.0 * smaller / larger}
        return {'h': 1.0 * smaller / larger, 'w': 1}

    def get_blur_hash(self, image_url: str, _h: int, _w: int):
        """
        Method that generates the blurhash

        Returns: data url with base64 blur data
        """
        with Image.open(self.PATH_TO_IMAGE +
                        image_url).convert('RGB') as image_file:
            with BytesIO() as temp_file:
                image_file.save(temp_file, format='JPEG')
                temp_file.seek(0)
                blur_hash = blurhash.encode(temp_file,
                                            x_components=4,
                                            y_components=3)
                return self.blur_data_to_base64(blur_hash, _w, _h,)
                

    def make_blur_hash(self):
        """
        Generates and adds blurhash to all images in json file
        """
        complete = Event()
        with open(self.PATH, 'r', encoding="utf8") as file:
            file_data = json.load(file)
            self.proj_tot = len(file_data)
            thread = Thread(target=self.terminal_msg, args=(complete, ))
            thread.start()
            for project in file_data:
                self.curr_proj += 1
                self.curr_img = 0
                for image in project['productImages']:
                    self.img_tot = len(project['productImages'])
                    self.curr_img += 1
                    height = image['dimensions']['h']
                    width = image['dimensions']['w']
                    hw_ratio = self.find_ratio(height, width)
                    blur_data = self.get_blur_hash(image['url'], hw_ratio['h'], hw_ratio['w'])
                    image['blurDataURL'] = blur_data

        with open(self.PATH, "w", encoding='utf8') as file:
            json.dump(file_data, file)
        complete.set()
        thread.join()


BLUR = CreateBlurHash()
BLUR.make_blur_hash()
