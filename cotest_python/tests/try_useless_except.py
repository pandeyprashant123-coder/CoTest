"""
Violation:

Capturing an exception just to raise it again has no effect in runtime,
and is considered a bad practice.

It's recommended to either log the error, change the behavior on capture,
or just remove the try-except block.

"""


class MyException(Exception):
    pass


def func_blanket():
    # ERROR
    try:
        ...
    except:
        raise


def func_blanket_custom():
    # OK - raises other
    try:
        ...
    except:
        raise MyException
