<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // * ==========================================
        // * BƯỚC 1: TRUY XUẤT ID TỪ SLUG DANH MỤC
        // * ==========================================
        // ? Lấy id danh mục con để gán vào trường category_id của sản phẩm cà phê
        $espresso = Category::where('slug', 'espresso')->value('id');
        $americano = Category::where('slug', 'americano')->value('id');
        $latte = Category::where('slug', 'latte')->value('id');
        $frappe = Category::where('slug', 'frappe-frappe')->value('id');
        $phinvietnam = Category::where('slug', 'phin-viet-nam')->value('id');
        $coldbrew = Category::where('slug', 'cold-brew')->value('id');

        // ? Lấy id danh mục con để gán vào trường category_id của sản phẩm trà
        $matcha = Category::where('slug', 'matcha-tay-bac')->value('id');
        $tratraicay = Category::where('slug', 'tra-trai-cay')->value('id');
        $trasua = Category::where('slug', 'tra-sua')->value('id');
        $chocolate = Category::where('slug', 'chocolate')->value('id');

        // * ==========================================
        // * BƯỚC 2: CHUẨN BỊ MẢNG DỮ LIỆU SẢN PHẨM
        // * ==========================================
        $products = [
            // ? Sản phẩm thuộc danh mục Espresso
            [
                'name' => 'Espresso Nóng',
                'description' => 'Một tách Espresso nguyên bản được bắt đầu bởi những hạt Arabica chất lượng, phối trộn với tỉ lệ cân đối hạt Robusta, cho ra vị ngọt caramel, vị chua dịu và sánh đặc.',
                'price' => 45000,
                'image_url' => 'https://res.cloudinary.com/dcds77ifp/image/upload/v1769692747/espresso_shot_kkhfum.png',
                'category_id' => $espresso,
            ],
            [
                'name' => 'Espresso Đá',
                'description' => 'Một tách Espresso nguyên bản được bắt đầu bởi những hạt Arabica chất lượng, phối trộn với tỉ lệ cân đối hạt Robusta, cho ra vị ngọt caramel, vị chua dịu và sánh đặc.',
                'price' => 49000,
                'image_url' => 'https://res.cloudinary.com/dcds77ifp/image/upload/v1769692747/espresso_da_edh7xo.png',
                'category_id' => $espresso,
            ],
            [
                "name" => "Americano Nóng",
                "price" => 45000,
                "description" => "Americano được pha chế bằng cách pha thêm nước với tỷ lệ nhất định vào tách cà phê Espresso, từ đó mang lại hương vị nhẹ nhàng và giữ trọn được mùi hương cà phê đặc trưng.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692748/americano_nong_rjmml5.png",
                "category_id" => $espresso
            ],
            [
                "name" => "Latte Nóng",
                "price" => 59000,
                "description" => "Một sự kết hợp tinh tế giữa vị đắng cà phê Espresso nguyên chất hòa quyện cùng vị sữa nóng ngọt ngào, bên trên là một lớp kem mỏng nhẹ tạo nên một tách cà phê hoàn hảo về hương vị lẫn nhãn quan.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692747/latte_nong_n4txjx.png",
                "category_id" => $espresso
            ],
            [
                "name" => "Cappuccino Đá",
                "price" => 55000,
                "description" => "Capuchino là thức uống hòa quyện giữa hương thơm của sữa, vị béo của bọt kem cùng vị đậm đà từ cà phê Espresso. Tất cả tạo nên một hương vị đặc biệt, một chút nhẹ nhàng, trầm lắng và tinh tế.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692748/cappucino_da_hyajuu.png",
                "category_id" => $espresso
            ],
            [
                "name" => "Cappuccino Nóng",
                "price" => 55000,
                "description" => "Capuchino là thức uống hòa quyện giữa hương thơm của sữa, vị béo của bọt kem cùng vị đậm đà từ cà phê Espresso. Tất cả tạo nên một hương vị đặc biệt, một chút nhẹ nhàng, trầm lắng và tinh tế.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692747/cappucino_nong_vflhat.png",
                "category_id" => $espresso
            ],
            [
                "name" => "Caramel Macchiato Đá",
                "price" => 65000,
                "description" => "Khuấy đều trước khi sử dụng\nCaramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị khi vị thơm béo của bọt sữa, sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng và vị ngọt đậm của sốt caramel được gói gọn trong một tách cà phê.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692748/caramel_macchiato_da_kacorx.png",
                "category_id" => $espresso
            ],
            [
                "name" => "Caramel Macchiato Nóng",
                "price" => 69000,
                "description" => "Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị khi vị thơm béo của bọt sữa, sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng và vị ngọt đậm của sốt caramel được gói gọn trong một tách cà phê.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692747/caramel_macchiato_nong_quktpb.png",
                "category_id" => $espresso
            ],

            // ? Sản phẩm thuộc danh mục Americano
            [
                "name" => "A-Mê Classic",
                "price" => 39000,
                "description" => "Thức uống Americano nguyên bản từ 100% Arabica, tươi tỉnh tức thì. Uống là mê!",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692962/a-me_classic_buha7r.png",
                "category_id" => $americano
            ],
            [
                "name" => "A-Mê Đào",
                "price" => 49000,
                "description" => "Mê ly với Americano từ 100% Arabica kết hợp cùng Đào ngọt thanh, dậy vị tươi mát.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692957/americano_dao_ktkwlj.png",
                "category_id" => $americano
            ],
            [
                "name" => "A-Mê Mơ",
                "price" => 49000,
                "description" => "Mê say với Americano từ 100% Arabica kết hợp cùng Mơ chua ngọt, tươi mới mỗi ngày.\n*Khuấy đều để thưởng thức trọn vị",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692957/americano_mo_yima8x.png",
                "category_id" => $americano
            ],
            [
                "name" => "A-Mê Yuzu",
                "price" => 49000,
                "description" => "Mê tít với Americano từ 100% Arabica kết hợp cùng Thanh Yên chua dịu, sảng khoái tức thì. *Khuấy đều để thưởng thức trọn vị",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769692957/americano_thanh_yen_tgl7cs.png",
                "category_id" => $americano
            ],

            // ? Sản phẩm thuộc danh mục Latte
            [
                "name" => "Latte Hạnh Nhân",
                "price" => 59000,
                "description" => "Latte Hạnh Nhân là sự kết hợp giữa Espresso đậm đà, sữa tươi béo ngậy, và syrup hạnh nhân thơm lừng, mang đến một hương vị ngọt nhẹ, béo ngậy và mát lạnh. Thức uống này tạo nên sự hòa quyện tuyệt vời giữa cà phê và vị hạnh nhân đặc trưng, đem lại cảm giác dễ chịu và độc đáo.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693023/latte_hanh_nhan_cc6gef.png",
                "category_id" => $latte
            ],
            [
                "name" => "Latte Caramel Cold Foam",
                "price" => 59000,
                "description" => "",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693023/latte_caremel_cold_foam_cfx48k.png",
                "category_id" => $latte
            ],
            [
                "name" => "Latte Classic",
                "price" => 55000,
                "description" => "Latte Đá là sự kết hợp hoàn hảo giữa espresso đậm đà và sữa tươi béo ngậy, tạo ra một hương vị dịu nhẹ, không quá đắng nhưng vẫn giữ được sự đậm đà của cà phê. Khi thêm đá lạnh, Latte Đá mang lại cảm giác mát lạnh, dễ uống, rất thích hợp cho những ngày nóng. Hương vị của sữa tươi hòa quyện với cà phê tạo nên một thức uống thơm ngon, thanh mát nhưng vẫn đầy đủ độ béo và sự ngọt nhẹ.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693029/latte-classic_by9ag2.png",
                "category_id" => $latte
            ],
            [
                "name" => "Latte Bạc Xỉu",
                "price" => 49000,
                "description" => "Latte Bạc Xỉu là sự kết hợp giữa Espresso, sữa tươi béo ngậy và cà phê phin đậm đà, tạo ra một hương vị vừa ngọt nhẹ, vừa đậm đà, dễ uống và mát lạnh.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693026/latte-bac-xiu_svmtl9.png",
                "category_id" => $latte
            ],
            [
                "name" => "Latte Hazelnut",
                "price" => 59000,
                "description" => "Latte Hazelnut là sự kết hợp giữa Espresso đậm đà, sữa tươi béo ngậy, và syrup hạt phỉ ngọt nhẹ, mang đến một hương vị thơm lừng, béo ngậy và mát lạnh. Thức uống này mang đến sự hòa quyện hoàn hảo giữa cà phê và hương vị hạt phỉ, tạo nên một trải nghiệm dễ chịu và thơm ngon.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693027/halzenut-latte_pfpofj.png",
                "category_id" => $latte
            ],

            // ? Sản phẩm thuộc danh mục Frappe-Frappe
            [
                "name" => "Floaty Vanilla Mocha",
                "price" => 65000,
                "description" => "",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693168/floaty_vanilla_mocha_scyxu9.png",
                "category_id" => $frappe
            ],
            [
                "name" => "Floaty Bạc Xỉu",
                "price" => 65000,
                "description" => "",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693170/floaty_bac_xiu_pqmquj.png",
                "category_id" => $frappe
            ],
            [
                "name" => "Floaty Matcha Latte",
                "price" => 65000,
                "description" => "",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693169/matcha-frappe_mdg62u.png",
                "category_id" => $frappe
            ],
            [
                "name" => "Frappe Matcha Tây Bắc",
                "price" => 65000,
                "description" => "Frappe Matcha kết hợp trà xanh matcha xay mịn với sữa và đá xay, mang lại một thức uống mát lạnh với hương vị thanh nhẹ đặc trưng của trà xanh. Sự kết hợp này mang đến cảm giác thư giãn, dễ chịu nhưng vẫn có chút đắng nhẹ của matcha, hoàn hảo cho những ai muốn thưởng thức một món đồ uống không quá ngọt.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693169/floaty_matcha_latte_sr0jyb.png",
                "category_id" => $frappe
            ],
            [
                "name" => "Frappe Chocochip",
                "price" => 65000,
                "description" => "Frappe Choco Chip, thử là đã! Lớp whipping cream bồng bềnh, beo béo lại có thêm bột sô cô la và sô cô la chip trên cùng. Gấp đôi vị ngon với sô cô la thật xay với đá sánh mịn, đậm đà đến tận ngụm cuối cùng.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693189/choco-chip-frappe_cughjg.png",
                "category_id" => $frappe
            ],

            // ? Sản phẩm thuộc danh mục Phin Việt Nam
            [
                "name" => "Bạc Xỉu Foam Dừa",
                "price" => 45000,
                "description" => "Bạc Xỉu Foam Dừa với phiên bản cà phê phin mới được tinh chỉnh, kết hợp giữa Robusta đậm đà và Arabica thơm dịu, hòa quyện cùng sữa đặc béo ngọt, sữa tươi mượt mà để cân bằng vị. Điểm nhấn chính là lớp foam kem dừa bồng bềnh, thơm béo, khiến mỗi ngụm đều tròn vị và khó quên.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693100/bac_xiu_foam_dua_ro0opj.png",
                "category_id" => $phinvietnam
            ],
            [
                "name" => "Bạc Xỉu Caramel Muối",
                "price" => 45000,
                "description" => "Bạc Xỉu Caramel Muối với phiên bản cà phê phin mới được tinh chỉnh, kết hợp giữa Robusta đậm đà và Arabica thơm dịu, hòa quyện cùng kem sữa béo mịn, sữa tươi cân bằng vị và xốt caramel mằn mặn, tạo nên lớp hương ngọt ngào nhưng không gắt, béo nhưng không ngấy.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693101/bac_xiu_caramel_muoi_nhjcsl.png",
                "category_id" => $phinvietnam
            ],
            [
                "name" => "Bạc Xỉu",
                "price" => 39000,
                "description" => "Bạc xỉu chính là \"Ly sữa trắng kèm một chút cà phê\". Thức uống này rất phù hợp những ai vừa muốn trải nghiệm chút vị đắng của cà phê vừa muốn thưởng thức vị ngọt béo ngậy từ sữa.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693100/bac_xiu_truyen_thong_i4bngw.png",
                "category_id" => $phinvietnam
            ],
            [
                "name" => "Bạc Xỉu Nóng",
                "price" => 39000,
                "description" => "Bạc xỉu chính là \"Ly sữa trắng kèm một chút cà phê\". Thức uống này rất phù hợp những ai vừa muốn trải nghiệm chút vị đắng của cà phê vừa muốn thưởng thức vị ngọt béo ngậy từ sữa.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693098/bac_xiu_truyen_thong_nong_feiczn.png",
                "category_id" => $phinvietnam
            ],
            [
                "name" => "Cà Phê Đen Nóng",
                "price" => 39000,
                "description" => "Không ngọt ngào như Bạc sỉu hay Cà phê sữa, Cà phê đen mang trong mình phong vị trầm lắng, thi vị hơn. Người ta thường phải ngồi rất lâu mới cảm nhận được hết hương thơm ngào ngạt, phảng phất mùi cacao và cái đắng mượt mà trôi tuột xuống vòm họng.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693099/ca_phe_phin_den_nong_jbimt2.png",
                "category_id" => $phinvietnam
            ],
            [
                "name" => "Cà Phê Sữa Nóng",
                "price" => 39000,
                "description" => "Cà phê được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693087/ca_phe_phin_nau_nong_iwsl0l.png",
                "category_id" => $phinvietnam
            ],
            [
                "name" => "Cà Phê Đen Đá",
                "price" => 39000,
                "description" => "Không ngọt ngào như Bạc sỉu hay Cà phê sữa, Cà phê đen mang trong mình phong vị trầm lắng, thi vị hơn. Người ta thường phải ngồi rất lâu mới cảm nhận được hết hương thơm ngào ngạt, phảng phất mùi cacao và cái đắng mượt mà trôi tuột xuống vòm họng.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693097/ca_phe_phin_den_da_djfdtm.png",
                "category_id" => $phinvietnam
            ],
            [
                "name" => "Cà Phê Sữa Đá",
                "price" => 39000,
                "description" => "Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693087/ca_phe_phin_nau_da_gpaosi.png",
                "category_id" => $phinvietnam
            ],

            // ? Sản phẩm thuộc danh mục Cold Brew
            [
                "name" => "Cold Brew Truyền Thống",
                "price" => 45000,
                "description" => "Tại The Coffee House, Cold Brew được ủ và phục vụ mỗi ngày từ 100% hạt Arabica Cầu Đất với hương gỗ thông, hạt dẻ, nốt sô-cô-la đặc trưng, thoang thoảng hương khói nhẹ giúp Cold Brew giữ nguyên vị tươi mới.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693234/cold_brew_truyen_thong_yapqih.png",
                "category_id" => $coldbrew
            ],
            [
                "name" => "Cold Brew Kim Quất",
                "price" => 49000,
                "description" => "Vị chua ngọt của Kim Quất làm dậy lên hương vị trái cây tự nhiên vốn sẵn có trong hạt cà phê Arabica Cầu Đất, mang đến một ly Cold Brew vừa nhẹ nhàng và thanh mát, đã khát ngày hè.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769693231/cold_brew_kim_quat_submpv.png",
                "category_id" => $coldbrew
            ],

            // ? Sản phẩm thuộc danh mục Matcha Tây Bắc
            [
                "name" => "Matcha Latte Tây Bắc",
                "price" => 45000,
                "description" => "Best seller của Nhà - rất phù hợp cho ai muốn nhập môn matcha. \n*Khuấy đều để thưởng trọn hương vị.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769694975/matcha_latte_tay_bac_da_ex9lyp.png",
                "category_id" => $matcha
            ],
            [
                "name" => "Matcha Latte Tây Bắc (Nóng)",
                "price" => 49000,
                "description" => "Trà Xanh Latte (Nóng) là phiên bản rõ vị trà nhất. Nhấp một ngụm, bạn chạm ngay vị trà xanh Tây Bắc chát nhẹ hoà cùng sữa nguyên kem thơm béo, đọng lại hậu vị ngọt ngào, êm dịu. Không chỉ là thức uống tốt cho sức khoẻ, Trà Xanh Latte (Nóng) còn là cái ôm ấm áp của đồng bào Tây Bắc gửi cho người miền xuôi.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769694974/matcha_latte_tay_bac_nong_kxmp3h.png",
                "category_id" => $matcha
            ],
            [
                "name" => "Matcha Latte Tây Bắc Sữa Yến Mạch",
                "price" => 55000,
                "description" => "Vị matcha êm mượt nhờ kết hợp với sữa yến mạch.\n*Khuấy đều để thưởng trọn hương vị.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769694974/matcha_latte_tay_bac_yen_mach_da_f7b11y.png",
                "category_id" => $matcha
            ],
            [
                "name" => "Matcha Latte Tây Bắc Sữa Yến Mạch (Nóng)",
                "price" => 55000,
                "description" => "Vị matcha êm mượt nhờ kết hợp với sữa yến mạch (ui da nóng quá).\n*Khuấy đều để thưởng trọn hương vị.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769694973/matcha_latte_tay_bac_yen_mach_nong_lbqgtm.png",
                "category_id" => $matcha
            ],
            [
                "name" => "Matcha Latte",
                "price" => 55000,
                "description" => "Matcha Nhật Bản hảo hạng kết hợp sữa tươi mịn màng, cân bằng vị umami thanh nhẹ và độ béo dịu, mang đến thức uống thơm ngon, đầy năng lượng.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769694975/matcha-latte_pqqcrr.png",
                "category_id" => $matcha
            ],
            [
                "name" => "Matcha Tây Bắc Trân Châu Hoàng Kim",
                "price" => 49000,
                "description" => "Matcha kết hợp đường đen Okinawa, sữa béo nhẹ và trân châu hoàng kim mềm dẻo, tạo nên hương vị đậm đà, ngọt ngào nhưng vẫn thanh mát.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769694976/matcha-dao-copy_vga46m.png",
                "category_id" => $matcha
            ],

            // ? Sản phẩm thuộc danh mục Trà Trái Cây 
            [
                "name" => "Trà Đào Cam Sả - Nóng",
                "price" => 59000,
                "description" => "Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695082/oolong-tu-quy-sen-nong-copy_p6y3kx.png",
                "category_id" => $tratraicay
            ],
            [
                "name" => "Trà Đào Cam Sả - Đá",
                "price" => 49000,
                "description" => "Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695087/tra-dao-cam-sa_auzq3v.png",
                "category_id" => $tratraicay
            ],
            [
                "name" => "Oolong Tứ Quý Sen (Nóng)",
                "price" => 59000,
                "description" => "Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi thơm ngon. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695083/oolong_tu_quy_sen_nong_lizzdn.png",
                "category_id" => $tratraicay
            ],
            [
                "name" => "Oolong Tứ Quý Sen",
                "price" => 49000,
                "description" => "Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi và lớp foam cheese béo ngậy. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695085/oolong_tu_quy_sen_da_hydtsx.png",
                "category_id" => $tratraicay
            ],

            // ? Sản phẩm thuộc danh mục Trà Sữa
            [
                "name" => "Trà Sữa Oolong Nướng Sương Sáo",
                "price" => 55000,
                "description" => "Tận hưởng hương vị Oolong nướng đậm đà được Nhà rang kỹ càng, quyện cùng sữa thơm béo, càng thêm hấp dẫn với sương sáo thanh mát.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695138/tra_sua_oolong_nuong_suong_sao_pzxdx2.png",
                "category_id" => $trasua
            ],
            [
                "name" => "Trà Sữa Oolong Tứ Quý Sương Sáo",
                "price" => 55000,
                "description" => "Trà Oolong Tứ Quý ngạt ngào hoa cỏ mùa xuân, hòa quyện cùng sữa thơm mịn màng, sương sáo thanh mát. Đó là Lộc Yêu Yêu ngọt ngào mà Nhà gửi gắm đến bạn.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695137/tra_sua_oolong_tu_quy_suong_sao_ax3nen.png",
                "category_id" => $trasua
            ],
            [
                "name" => "Hồng Trà Sữa Nóng",
                "price" => 55000,
                "description" => "Từng ngụm trà chuẩn gu ấm áp, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện.\n\nTrà đen nguyên lá âm ấm dịu nhẹ, quyện cùng lớp sữa thơm béo khó lẫn - hương vị ấm áp chuẩn gu trà, cho từng ngụm nhẹ nhàng, ngọt dịu lưu luyến mãi nơi cuống họng.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695139/hong_tra_sua_nong_hnizjx.png",
                "category_id" => $trasua
            ],
            [
                "name" => "Hồng Trà Sữa Trân Châu",
                "price" => 55000,
                "description" => "Thêm chút ngọt ngào cho ngày mới với hồng trà nguyên lá, sữa thơm ngậy được cân chỉnh với tỉ lệ hoàn hảo, cùng trân châu trắng dai giòn có sẵn để bạn tận hưởng từng ngụm trà sữa ngọt ngào thơm ngậy thiệt đã.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695140/hong_tra_sua_tran_chau_bxkkri.png",
                "category_id" => $trasua
            ],
            [
                "name" => "Trà Đen Macchiato",
                "price" => 55000,
                "description" => "Trà đen được ủ mới mỗi ngày, giữ nguyên được vị chát mạnh mẽ đặc trưng của lá trà, phủ bên trên là lớp Macchiato \"homemade\" bồng bềnh quyến rũ vị phô mai mặn mặn mà béo béo.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695140/tra_den_macchiato_ntcskz.png",
                "category_id" => $trasua
            ],
            [
                "name" => "Trà Sữa Oolong BLao",
                "price" => 39000,
                "description" => "Tận hưởng hương vị núi rừng mát lành lắng đọng trong từng ngụm Trà Sữa Oolong B’Lao của Nhà. Từng lá trà được Nhà chắt chiu từ B’Lao (Lâm Đồng), sao (rang) kỹ càng để giữ trọn vị Oolong đậm đà, quyện cùng sữa thơm béo, hấp dẫn.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695138/tra_sua_oolong_blao_epechb.png",
                "category_id" => $trasua
            ],

            // ? Sản phẩm thuộc danh mục Chocolate
            [
                "name" => "Chocolate Đá",
                "price" => 55000,
                "description" => "Bột chocolate nguyên chất hoà cùng sữa tươi béo ngậy, ấm nóng. Vị ngọt tự nhiên, không gắt cổ, để lại một chút đắng nhẹ, cay cay trên đầu lưỡi.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695187/so_co_la_da_bhklup.png",
                "category_id" => $chocolate
            ],
            [
                "name" => "Chocolate Nóng",
                "price" => 55000,
                "description" => "Bột chocolate nguyên chất hoà cùng sữa tươi béo ngậy. Vị ngọt tự nhiên, không gắt cổ, để lại một chút đắng nhẹ, cay cay trên đầu lưỡi.",
                "image_url" => "https://res.cloudinary.com/dcds77ifp/image/upload/v1769695186/so_co_la_nong_pqccdh.png",
                "category_id" => $chocolate
            ]
        ];

        foreach ($products as $item) {
            Product::create($item);
        }
    }
}
