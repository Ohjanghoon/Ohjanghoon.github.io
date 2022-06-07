class Member_login_info {
    constructor(userId, pwd, userName, loginDate = Date.now()){
        this.userId = userId;
        this.pwd = pwd;
        this.userName = userName;
        this.loginDate = datetimeFormatter(loginDate);
    }
}

//로그인시에는 아이디, 비밀번호만 필요. 로그인 정보를 저장하기 위해 이름도 일단은 저장..?
//회원 정보 수정/삭제 기능은 아직 구현 못해서 필요한 정보만 불러오기
const members = () => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    // console.log(members);

    let members_login_info = [];

    members.map((member) => {
        const {userId, pwd, userName} = member;
        members_login_info.push(new Member_login_info(userId, pwd, userName));
    });

    return members_login_info;
};

//회원가입에서 아이디 중복검사가 로그인 페이지에선 아이디 존재여부 판단
const checkId = () => {
    // console.log(members());

    const inputId = document.getElementById("userId").value;

    let available = false;

    members().forEach((member) => {
        const {userId} = member;
        console.log(userId);
        if(inputId === userId){
            available = true;
        }
    });

    if(!available){
        showMsg(loginMsg, "존재하지 않는 아이디입니다.");
        return false;
    }
    showMsg(loginMsg, "비밀번호를 입력해주세요.");
    pwd.focus();
    return inputId;

};
//아이디 체크 피드백
userId.onblur = () => {
    checkId();
};

//입력한 아이디와 비밀번호를 대조하여 로그인 성공처리
const checkPwd = (inputId) => {
    const inputPwd = document.getElementById("pwd").value;
    // console.log(inputPwd);

    let available = false;

    members().forEach((member) => {
        const {userId, pwd} = member;
        console.log(userId, pwd);
        if(inputId === userId){
            if(inputPwd === pwd){
                available = true;
            }
        }
    })

    return available;

};

const showMsg = (obj, msg) => {
    obj.innerHTML = msg;
};

document.loginFrm.onsubmit = () => {
    if(!checkId()){
        alert('아이디 확인해주세요!😥');
        userId.focus();
        return false;
    }
    const loginId = checkId();

    if(!checkPwd(loginId)){
        showMsg(loginMsg, "아이디와 비밀번호를 확인해주세요.");
        alert('아이디와 비밀번호를 확인해주세요!😥');
        return false;
    }

    saveLoginMember(loginId);
    alert('로그인 성공!🎉');
    return true;
};

const saveLoginMember = (loginId) => {
    let login_member = null;
    console.log(1);
    members().forEach((member) => {
        const {userId, userName} = member;
        if(loginId === userId){
            login_member = new Member_login_info(userId, "*암호화*", userName);
        }
    });
    console.log(2);
    
    const data = JSON.stringify(login_member);
    console.log(3);
    localStorage.setItem('login_member', data);
    console.log(4);


};

const datetimeFormatter = (millis) => {
    const d = new Date(millis);
    const f = (n) => n < 10 ? '0' + n : n;
    
    const yyyy = d.getFullYear(); 
    const mm = f(d.getMonth() + 1);
    const dd = f(d.getDate());
    const hh = f(d.getHours());
    const mi = f(d.getMinutes());
    return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
};