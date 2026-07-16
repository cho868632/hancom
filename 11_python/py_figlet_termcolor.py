import pyfiglet
from termcolor import colored

py_text = pyfiglet.figlet_format("Hello")
color_text = colored(py_text, "red")
print(color_text)

import pyfiglet
from termcolor import colored

py_text = pyfiglet.figlet_format("Python")
color_text = colored(py_text, "yellow", "on_blue", ["bold"])
print(color_text)

color_text = colored(py_text,"yellow")
print(color_text)

color_text = colored(py_text, on_color="on_light_cyan", attrs=["strike"])
print(color_text)
