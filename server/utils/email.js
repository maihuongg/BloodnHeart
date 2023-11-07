const Mailjet = require('node-mailjet');
const userController = require('../controllers/userController');
require('dotenv').config();
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

const sendMail = async (user, resetLink) => {
    try {
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "maihuongdang76@gmail.com",
                            Name: "BloodnHeart"
                        },
                        To: [
                            {
                                Email: user.email,
                                Name: user.fullName
                            }
                        ],
                        Subject: "[BloodnHeart] THAY ĐỔI MẬT KHẨU ",
                        HTMLPart: 
                        `
                        <p>Chào bạn,</p>

                        <p>Cảm ơn bạn đã liên hệ với chúng tôi. Để đảm bảo an toàn và bảo mật tài khoản của bạn, chúng tôi đã nhận được yêu cầu thay đổi mật khẩu.</p>
                        
                        <p>Dưới đây là đường dẫn để thay đổi mật khẩu của bạn: <a href="${resetLink}">${resetLink}</a></p>
                        
                        <p>Vui lòng nhấp vào đường dẫn trên để tiếp tục quá trình thay đổi mật khẩu của bạn. Nếu bạn không thực hiện yêu cầu này, vui lòng liên hệ ngay lập tức với bộ phận hỗ trợ của chúng tôi.</p>
                        
                        <p>Chúng tôi luôn ở đây để hỗ trợ bạn. Xin cảm ơn!</p>
                        
                        <p>Trân trọng,</p>
                        <p>BloodnHeart Team.</p>
                        `
                    }
                ]
            });

        console.log("Email sent successfully");
        return request;
    } catch (error) {
        console.log("Email not sent!");
        console.error(error);
        return error;
    }
};

module.exports = sendMail;