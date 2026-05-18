import os

FRONTEND_PATH = "frontend/src"


def read_file(file_path):

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    except Exception as e:
        print(e)
        return ""


def scrape_frontend():

    all_text = ""

    for root, dirs, files in os.walk(FRONTEND_PATH):

        for file in files:

            if file.endswith((".js", ".jsx", ".html")):

                path = os.path.join(root, file)

                content = read_file(path)

                all_text += content + "\n"

                print(f"Read: {path}")

    return all_text