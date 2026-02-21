import logging
from logging.handlers import RotatingFileHandler
import os

LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "logs")
LOG_DIR = os.path.abspath(LOG_DIR)
os.makedirs(LOG_DIR, exist_ok=True)

APP_LOG = os.path.join(LOG_DIR, "app.log")
ERROR_LOG = os.path.join(LOG_DIR, "error.log")


def setup_logging(level: str = "INFO"):
    logger = logging.getLogger()
    logger.setLevel(level)

    formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

    console = logging.StreamHandler()
    console.setFormatter(formatter)
    logger.addHandler(console)

    file_handler = RotatingFileHandler(APP_LOG, maxBytes=10 * 1024 * 1024, backupCount=5)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    error_handler = RotatingFileHandler(ERROR_LOG, maxBytes=10 * 1024 * 1024, backupCount=5)
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(formatter)
    logger.addHandler(error_handler)

    return logger
