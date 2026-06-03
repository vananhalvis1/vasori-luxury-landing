import os
from PIL import Image

source_dir = r"C:\Users\GOODM!\.gemini\antigravity-ide\brain\6196b49a-7c51-4d7f-bbe9-bb5cdd2d625b"
target_dir = r"d:\DN X tech\images"

# Create directories
folders = ["banners", "categories", "products", "gifts"]
for folder in folders:
    os.makedirs(os.path.join(target_dir, folder), exist_ok=True)

mappings = {
    # Banners
    "banner_cherry_1780480160190.png": "banners/banner-cherry.jpg",
    "banner_japan_1780478514942.png": "banners/banner-japan.jpg",
    "banner_tet_2027_1780480364039.png": "banners/banner-tet-2027.jpg",
    "banner_global_1780478566539.png": "banners/banner-world.jpg",
    
    # Products
    "prod_shine_muscat_1780480376860.png": "products/prod-shine-muscat.jpg",
    "prod_strawberry_korea_1780480389705.png": "products/prod-strawberry-korea.jpg",
    "prod_kiwi_gold_1780480402073.png": "products/prod-kiwi-gold.jpg",
    "prod_crimson_grape_1780480411918.png": "products/prod-crimson-grape.jpg",
    "prod_blueberry_1780480424092.png": "products/prod-blueberry.jpg",
    "prod_fuji_apple_1780480435404.png": "products/prod-fuji-apple.jpg",
    "prod_white_peach_1780480448242.png": "products/prod-white-peach.jpg",
    "prod_cherry_usa_1780480179666.png": "products/prod-cherry-usa.jpg",

    # Gifts
    "gift_vas_gq001_1780480460855.png": "gifts/gift-vas-gq001.jpg",
    "gift_vas_gq002_1780480476405.png": "gifts/gift-vas-gq002.jpg",
    "gift_vas_gq008_1780480490033.png": "gifts/gift-vas-gq008.jpg",
}

for src_name, dst_name in mappings.items():
    src_path = os.path.join(source_dir, src_name)
    dst_path = os.path.join(target_dir, dst_name)
    if os.path.exists(src_path):
        try:
            with Image.open(src_path) as img:
                rgb_im = img.convert('RGB')
                rgb_im.save(dst_path, 'JPEG', quality=85, optimize=True)
            print(f"Processed {dst_name}")
        except Exception as e:
            print(f"Error processing {src_name}: {e}")
    else:
        print(f"Missing {src_path}")
