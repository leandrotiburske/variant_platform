import logging

logger = logging.getLogger(__name__)

# Set the logging level for the logger
logger.setLevel(logging.INFO)

# Create a stream handler for logging
handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)

# Define a formatter for the log messages
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(handler)

# Log a debug message indicating that logging is set up
logger.info("Logging is set up.")
