I. Tổng quan

![alt text](https://github.com/xhieu94/Image/blob/master/Modules.png)
II. Modules Detail

1. App Module
App Module bao gồm Header Component và Footer compoent, được inject AuthService để kiểm tra tình trạng đăng nhập để hiển thị nội dung tương ứng.

![alt text](https://github.com/xhieu94/Image/blob/master/AppModule.png)

2. Home Module
Home module hiển thị trang home, là trang hiển thị các article và feed (chỉ hiển thị với user) và phân trang cho người dùng, TagComponent để hiển thị các tag để người dùng lựa chọn. TagComponent để get data về tag từ api trả về home, AuthService để lấy thông tin về trạng thái đăng nhập phục vụ hiển thị, ArticleService để lấy article list hiển thị. customDate pipe để định dạng ngày tháng ngoài trang chủ.

![alt text](https://github.com/xhieu94/Image/blob/master/HomeModule.png)

3. Auth Module
Auth Module có LoginComponent và Signup Component, inject Auth Service để kiểm tra việc đăng nhập và đăng ký và User Service để lưu thông tin đăng nhập. Setting Component để đăng xuất và chỉnh sửa thông tin của user đang đăng nhập. LoginComponent và SignupComponent được bảo vệ bởi No need guard để chặn người dùng đã đăng nhập vào trang này, setting component được bảo vệ bởi Auth Guard để người chưa đăng nhập không vào được.

![alt text](https://github.com/xhieu94/Image/blob/master/AuthModule.png)

4. Editor Module:
Article Detail Component để xem chi tiết bài viết, ngoài ra có thể follow user khác, tùy vào mục đích của người dùng. Inject Service ArticlesService để gửi dữ liệu về bài viết được update hay tạo mới. UserService phục vụ cho chức năng follow user khác. Article Detail chứa Comment Detail Component để hiển thị và đăng comment tùy thuộc vào người dùng truy cập dưới dạng user hay guest, component này inject commentService để làm việc với api phục vụ đăng hay hiển thị comment
Editor Detail Component để chỉnh sửa hay đăng bài viết mới phụ thuộc mục đích của user, inject Article Service để làm việc với api để chỉnh sửa hay đăng bài viết mới.
Các route để truy cập các component đều được bảo vệ với auth guard và hiển thị tùy thuộc vào trạng thái đăng nhập. Editor Detail Component được bảo vệ với Can Deactivate Editor Article Guard để hỏi user khi điều hướng trang web mà chưa lưu sự thay đổi.

![alt text](https://github.com/xhieu94/Image/blob/master/EditorModule.png)

5. Profile Module:
Profile Component là nơi hiện thị các info liên quan đến bài viết của user, nếu vào profile của user hiện thời sẽ có nút điều hướng ra trang edit, được inject 2 service là UserService và Articles Service, đối với user khác sẽ follow được user đó chứa 2 component:
List Article Component để hiển thị danh sách những bài viết của user đó, bao gồm những bài viết user thích và những bài viết user đã đăng. Người dùng có thể like hay dislike những bài viết ở đây. Component này được inject ArticlesService để làm việc với api với các tác vụ liên quan đến article.
Pagination Component để phân trang nếu số lượng bài viết nhiều, component này tương tác với List Article Component để thay đổi hiện bài viết tương ứng với trang được chọn.

![alt text](https://github.com/xhieu94/Image/blob/master/ProfileModule.png)

III. Tương tác giữa các component
IV. Thành viên:
- Nguyễn Xuân Hiếu
- Đinh Văn Huy
 
