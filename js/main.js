const checkManager = () => {
    
    const logonMember = JSON.parse(localStorage.getItem("login_member"));
    console.log(logonMember);
    const {userId} = logonMember;
    console.log(userId);
    console.log(userId === 'admin1234');
    if(userId === "admin1234"){
        const path = './manage.html'
        window.location.href = path;
        return true;
    } else {
        alert("관리자 계정만 접근 가능합니다.");
        return false;
    }
};

window.addEventListener('scroll', () => {
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.pageYOffset > 0);
})
const checkLogout = () => {
    // const move_page = document.querySelector("#logout");
    const logout_ans = confirm("로그아웃 하시겠습니까? (로그인페이지로 이동)");

    if(logout_ans){
        localStorage.removeItem("login_member");
        alert("로그아웃 🙋‍♂️");
        // move_page.href = "login.html";
    } 
    return logout_ans;
};

window.addEventListener('scroll', () => {
    let btn_top = document.querySelector("#btn_top");
    btn_top.classList.toggle("active", window.pageYOffset > 200);
})
const scrollToTop = () => {
    window.scrollTo({
        top: 0
    })
};

window.addEventListener('scroll', () => {
    let text = document.querySelector(".aboutMe_content");
    let profile = document.querySelector("#aboueMe_img");
    let mbti = document.querySelector("#mbti_img");
    let nav_aboutMe = document.querySelector("#nav_aboutMe");
    let nav_gallery = document.querySelector("#nav_gallery");
    let nav_roadmap = document.querySelector("#nav_roadmap");

    let road1 = document.querySelector(".road1");
    let road2 = document.querySelector(".road2");
    let road3 = document.querySelector(".road3");
    let road4 = document.querySelector(".road4");

    // let road1_text = document.querySelector("#road1_text");
    // let road2_text = document.querySelector("#road2_text");
    // let road3_text = document.querySelector("#road3_text");
    // let road4_text = document.querySelector("#road4_text");
    let value = window.scrollY;
    // console.log("scrollY", value);

    if(value > 450){
        text.style.animation = "slide 2s ease-out forwards";
    } else {
        text.style.animation = "disappear 2s ease-out forwards";
    }
    
    if(value > 550){
        profile.style.filter = "grayscale(0)";
        profile.style.boxShadow = "-20px 20px 10px 0 rgb(0, 0, 0)";
        mbti.style.opacity = 1;
    } else {
        profile.style.filter = "grayscale(100)";
        profile.style.boxShadow = "none";
        mbti.style.opacity = 0;
    }

    if(value <= 680) {
        nav_aboutMe.style.color = "white";
        nav_gallery.style.color = "white";
        nav_roadmap.style.color = "white";
    } else if (value > 680 && value < 1430) {
        nav_aboutMe.style.color = "black";
        nav_gallery.style.color = "white";
        nav_roadmap.style.color = "white";
    } else if (value >= 1430 && value < 2200) {
        nav_aboutMe.style.color = "white";
        nav_gallery.style.color = "black";
        nav_roadmap.style.color = "white";
    } else if (value >= 2200 && value < 3000) {
        nav_aboutMe.style.color = "white";
        nav_gallery.style.color = "white";
        nav_roadmap.style.color = "black";
    }

});