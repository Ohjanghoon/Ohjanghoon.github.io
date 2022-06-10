//로그인 상태 : 바로 메인 페이지로 이동. 
//비로그인 상태 : 로그인 페이지로 이동
intro_logo.addEventListener('click', () => {
    const logonMember = JSON.parse(localStorage.getItem("login_member"));
    // console.log(logonMember);
    let movePage = document.querySelector("#intro_logo");

    if(!logonMember){
        movePage.href = 'login.html';
    } else {
        movePage.href = 'main.html';
    }
});
