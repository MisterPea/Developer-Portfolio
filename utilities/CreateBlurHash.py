import json
import math
import base64
from io import BytesIO
import sys
import os
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

    def blur_data_to_base64(self,
                            blur_hash,
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
        with Image.open(image_url).convert('RGB') as image_file:
            with BytesIO() as temp_file:
                image_file.save(temp_file, format='JPEG')
                temp_file.seek(0)
                blur_hash = blurhash.encode(temp_file,
                                            x_components=4,
                                            y_components=3)
                return self.blur_data_to_base64(
                    blur_hash,
                    _w,
                    _h,
                )

    def get_image_size(self, image_url):
        """Retrieves image size"""
        with Image.open(image_url) as open_image:
            width, height = open_image.size
            return {"w": width, "h": height}

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
                    # Convenience var to hold url
                    # image_url = self.PATH_TO_IMAGE + image['url']
                    thumb_url = self.PATH_TO_IMAGE + image['thumb_1x']
                    main_url = self.PATH_TO_IMAGE + image['url_1x']
                    self.img_tot = len(project['productImages'])
                    self.curr_img += 1

                    thumb_size = self.get_image_size(thumb_url)
                    main_size = self.get_image_size(main_url)
                    # we're writing the current size of the image to the file.

                    image['thumbDimensions']['h'] = thumb_size['h']
                    image['thumbDimensions']['w'] = thumb_size['w']

                    image['dimensions']['h'] = main_size['h']
                    image['dimensions']['w'] = main_size['w']

                    hw_ratio = self.find_ratio(main_size['h'], main_size['w'])
                    blur_data = self.get_blur_hash(main_url, hw_ratio['h'],hw_ratio['w'])
                    image['blurDataURL'] = blur_data

        with open(self.PATH, "w", encoding='utf8') as file:
            json.dump(file_data, file)
        complete.set()
        thread.join()

    def resize_images(self, max_thumb_height, max_image_height):
        """Resize images in a folder based upon"""
        folder = os.listdir(self.PATH_TO_IMAGE)
        for original_image in folder:
            if os.path.isfile(self.PATH_TO_IMAGE + original_image) and original_image != '.DS_Store':
                print(original_image)
                with Image.open(self.PATH_TO_IMAGE + original_image) as img:
                    width, height = img.size
                    width_ratio = width/height
                    filename, ext = os.path.splitext(self.PATH_TO_IMAGE + original_image)
                    thumb_resize_1x = img.resize((math.trunc(width_ratio * max_thumb_height), max_thumb_height), Image.LANCZOS)
                    thumb_resize_1x.save(filename + '_thumb_1x.webp','webp',exact=True, quality=95, lossless=True, method=6)
                    thumb_resize_2x = img.resize((math.trunc(width_ratio * max_thumb_height)*2, max_thumb_height*2), Image.LANCZOS)
                    thumb_resize_2x.save(filename + '_thumb_2x.webp','webp',exact=True, quality=95, lossless=True, method=6)
                    main_resize_1x = img.resize((math.trunc(width_ratio * max_image_height), max_image_height), Image.LANCZOS)
                    main_resize_1x.save(filename + '_main_1x.webp','webp',exact=True, quality=95, lossless=True, method=6)
                    main_resize_2x = img.resize((math.trunc(width_ratio * max_image_height)*2, max_image_height*2), Image.LANCZOS)
                    main_resize_2x.save(filename + '_main_2x.webp','webp',exact=True, quality=95, lossless=True, method=6)



BLUR = CreateBlurHash()
BLUR.make_blur_hash()
# BLUR.resize_images(200,800)
