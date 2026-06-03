import os
import requests
from openai import OpenAI

# 1. Điền API Key của OpenAI vào đây
API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 

client = OpenAI(api_key=API_KEY)

# 2. Prompt Tiếng Anh đã được tối ưu hóa từ ý tưởng của bạn
# DALL-E 3 hoạt động tốt nhất với Tiếng Anh và tỉ lệ màn hình ngang (16:9 - 1792x1024)
PROMPT = """
A professional commercial product photography of premium Tet gift baskets, aspect ratio 16:9. 
Background: Dark mahogany wood table (#1A1008). On the right background, a draped burgundy red velvet curtain creating depth. Behind the center, a round rattan woven decorative frame, natural brown color, with soft backlighting. 
Main subject (occupying the right 60% of the frame): Three luxurious gift baskets arranged at different heights. 
- Back largest basket: A deep red lacquer round box with traditional gold carved borders, overflowing with shiny green Shine Muscat grapes, red Fuji apples, and yellow mangoes, piled high on a bed of golden straw. 
- Middle basket (on a wooden pedestal): A rectangular red and gold brocade fabric box containing a round navy blue Loyd cookie tin, a bottle of Italian red wine with a gold cap, a bag of macadamia nuts, and gold-foil wrapped chocolates. 
- Front small basket: A light brown woven bamboo tray displaying 4 fruits: 2 glossy red Fuji apples, 1 bunch of red grapes, 1 gold kiwi, each wrapped in a luxurious white protective foam net. 
Foreground details: 3-4 natural red cherries scattered on the table, 1-2 grapes rolled out, a small curled gold ribbon. 
Lighting: Professional studio lighting, main light from top-left at 45 degrees casting beautiful shadows to the right. Subtle rim light from behind separating the products from the background. Warm color temperature 3200K, moody and dramatic, feeling like a Hasselblad medium format shot. 
Negative Space: The left 40% of the frame is completely dark and empty, absolutely no props, reserved for text overlay. 
Style: High-end luxury commercial food photography, ultra-sharp details, photorealistic, no artificial color filters, no people, no text in the image.
"""

print("🚀 Đang gửi yêu cầu tạo ảnh siêu thực 4K đến AI...")

try:
    # 3. Gọi DALL-E 3 API
    response = client.images.generate(
        model="dall-e-3",
        prompt=PROMPT,
        size="1792x1024", # Tỉ lệ ngang HD chuẩn
        quality="hd",     # Chất lượng cao nhất (High Definition)
        n=1,
    )

    image_url = response.data[0].url
    print(f"✅ Đã tạo ảnh thành công! Đang tải về máy...")

    # 4. Tải ảnh về và lưu vào thư mục dự án
    img_data = requests.get(image_url).content
    with open("vasori-hero-banner.jpg", "wb") as handler:
        handler.write(img_data)
        
    print("🎉 Hoàn tất! File 'vasori-hero-banner.jpg' đã được lưu trong dự án của bạn.")

except Exception as e:
    print(f"❌ Có lỗi xảy ra: {e}")
