import json
import io
import sys
import time
from threading import Thread, Event
import blurhash
from PIL import Image

class CreateBlurHash:
    PATH = './public/workPagesContent.json'
    PATH_TO_IMAGE = './public/images/product_images/'
    proj_tot = 0
    curr_proj = 0
    img_tot = 0
    curr_img = 0

    def terminal_msg(self, complete):
        animation = ['=    ', '==   ', '===  ', '==== ', '=====', ' ====', '  ===', '   ==', '    =','   ==', '  ===', ' ====', '=====', '==== ','===  ', '==   ']
        while not complete.is_set():
            for frame in animation:
                sys.stdout.flush()
                current_str = 'Working on proj ' + str(self.curr_proj) + ' of ' + str(self.proj_tot) + '-img-' + str(self.curr_img) + ' of ' + str(self.img_tot) + frame
                sys.stdout.write("\r" + current_str)
                sys.stdout.flush()
                time.sleep(0.25)

    def get_blur_hash(self, image_url:str):
        with Image.open(self.PATH_TO_IMAGE + image_url).convert('RGB') as image_file:
            with io.BytesIO() as temp_file:
                image_file.save(temp_file, format='JPEG')
                temp_file.seek(0)
                return blurhash.encode(temp_file, x_components=4, y_components=3)

    def make_blur_hash(self):
        complete = Event()
        with open(self.PATH, 'r', encoding="utf8") as file:
            file_data = json.load(file)
            self.proj_tot = len(file_data)
            thread = Thread(target=self.terminal_msg, args=(complete,))
            thread.start()
            for project in file_data:
                self.curr_proj += 1
                self.curr_img = 0
                for image in project['productImages']:
                    self.img_tot = len(project['productImages'])
                    self.curr_img += 1
                    blur_hash = self.get_blur_hash(image['url'])
                    image['blurHash'] = blur_hash

        with open(self.PATH, "w", encoding='utf8') as file:
            json.dump(file_data, file)
        complete.set()
        thread.join()

BLUR = CreateBlurHash()
BLUR.make_blur_hash()
