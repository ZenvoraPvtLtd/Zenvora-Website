import os

REPO_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)
FRONTEND_PATH = os.path.join(REPO_ROOT, "frontend", "src")


def read_file(file_path):

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    except Exception as e:
        print(e)
        return ""


def scrape_frontend():

    all_text = ""

    if not os.path.isdir(FRONTEND_PATH):
        raise FileNotFoundError(f"Frontend source folder not found: {FRONTEND_PATH}")

    for root, dirs, files in os.walk(FRONTEND_PATH):

        for file in files:

            if file.endswith((".js", ".jsx", ".html")):

                path = os.path.join(root, file)

                content = read_file(path)

                all_text += content + "\n"

                print(f"Read: {path}")

    return all_text
