/**
 * 
 * 회원가입
 * 1. 유효성 검사
 * 2. 사용자가 입력 시도 후 올바른 형식으로 입력했는지 바로바로 체크 후 피드백 처리
 * 3. 모든 입력값을 전부 필수사항으로 설정
 * 
*/

//----------------------------------아이디----------------------------------------
// 아이디 유효성 검사 (중복 검사 기능 추가)
const checkId = () => {
    const tempId = document.querySelector("#userId").value;
    const idRegexp1 = /^[a-z]/g
    const idRegexp2 = /^[a-z][a-z0-9]{3,11}$/g;
    const idRegexp3 = /\d+/g;

    if(tempId === ""){
        showMsg(idMsg, "❗필수 정보입니다.");
        return false;
    }
    if(!idRegexp1.test(tempId)){
        showMsg(idMsg, "❗영소문자로 시작해주세요.");
        return false;
    }
    if(!idRegexp2.test(tempId)){
        showMsg(idMsg, "❗4~12자리 영소문자/숫자만 사용해주세요.");
        return false;
    }
    if(!idRegexp3.test(tempId)){
        showMsg(idMsg, "❗숫자를 하나이상 반드시 포함해주세요.");
        return false;
    }
    console.log("what", existedId(tempId));
    if(!existedId(tempId)) {
        showMsg(idMsg, "❗이미 가입된 아이디입니다.");
        return false;
    } else{
        showMsg(idMsg, "✔사용 가능");
        return tempId;
    }
    
};

//아이디 중복 검사
const existedId = (tempId) => {
    const members = JSON.parse(localStorage.getItem("members"));
    // console.log(members);
    if(!members) return true;
    let available = true;

    members.forEach((member) => {
        const {userId : chUserId} = member;
        if(tempId === chUserId){
            available = false;
        }
    });
    return available;
};

//아이디 체크 피드백
userId.onblur = () => {
    checkId();
};

//----------------------------------비밀번호----------------------------------------
//비밀번호 유효성 검사
const checkPwd = () => {
    const tempPwd = document.querySelector("#pwd").value;
    const pwdRegExp1 = /^[\da-zA-z!@#$%&]{8,12}$/g;
    const pwdRegExp2 = /\d+/g;
    const pwdRegExp3 = /[a-zA-z]+/g;
    const pwdRegExp4 = /[!@#$%&]+/;

    if(tempPwd === ""){
        showMsg(pwdMsg, "❗필수 정보입니다.");
        return false;
    }
    if(!pwdRegExp1.test(tempPwd)){
        showMsg(pwdMsg, "❗8~12자리 숫자/영대소문자/특수문자(!, @, #, $, %, &)를 사용하세요.")
        return false;
    }
    if(!pwdRegExp2.test(tempPwd)){
        showMsg(pwdMsg, "❗숫자를 하나이상 반드시 포함해주세요.");
        return false;
    }
    if(!pwdRegExp3.test(tempPwd)){
        showMsg(pwdMsg, "❗영대소문자를 하나이상 반드시 포함해주세요.");
        return false;
    }
    if(!pwdRegExp4.test(tempPwd)){
        showMsg(pwdMsg, "❗특수문자(!, @, #, $, %, &)를 하나이상 반드시 포함해주세요.");
        return false;
    }
    showMsg(pwdMsg, "✔사용 가능");

    pwdCheck.focus();
    //비밀번호 확인 일치여부 체크
    pwdCheck.onblur = () => {
        checkPwdCheck();
    };
    return tempPwd;
};
//비밀번호 체크
pwd.onblur = () => {
    checkPwd();
};

//비밀번호 일치여부 확인
const checkPwdCheck = () => {
    const tempPwdCheck = document.querySelector("#pwdCheck").value;

    if(tempPwdCheck === ""){
        showMsg(pwdCheckMsg, "❗필수 정보입니다.");
        return false;
    }
    if(pwd.value !== pwdCheck.value){
        showMsg(pwdCheckMsg, "❗비밀번호가 일치하지 않습니다.");
        return false;
    }

    showMsg(pwdCheckMsg, "✔비밀번호 일치");
    return true;
};
//비밀번호 표시
btn_show_pwd.addEventListener('mousedown', () => {
    const ele_pwd = document.querySelector("#pwd");
    const ele_pwdCheck = document.querySelector("#pwdCheck");

    ele_pwd.type = "text";
    ele_pwdCheck.type = "text";
});
btn_show_pwd.addEventListener('mouseup', () => {
    const ele_pwd = document.querySelector("#pwd");
    const ele_pwdCheck = document.querySelector("#pwdCheck");

    ele_pwd.type = "password";
    ele_pwdCheck.type = "password";
});

//----------------------------------이름----------------------------------------
//이름 유효성 검사 (중복 검사 기능 추가 예정? 1명당 복수 아이디 가능? => 복수 계정 생성 가능)
const checkName = () => {
    const tempUserName = document.querySelector("#userName").value;
    const nameRegexp = /^[가-힣]{2,}$/;

    if(tempUserName === ""){
        showMsg(nameMsg, "❗필수 정보입니다.");
        return false;
    }
    if(!nameRegexp.test(tempUserName)){
        showMsg(nameMsg, "❗이름을 다시 확인해주세요.");
        return false;
    }
    showMsg(nameMsg, "✔");
    return tempUserName;
};
//이름 체크
userName.onblur = () => {
    checkName();
};

//----------------------------------생년월일----------------------------------------
//생년월일 입력시 오늘 날짜 이후로는 선택 제한
{
    function f(n){
        return n < 10 ? "0" + n : n;
    }
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = f(now.getMonth() + 1);
    const dd = f(now.getDate());
    
    document.querySelector("#birth").max = `${yyyy}-${mm}-${dd}`;
}

//----------------------------------전화번호----------------------------------------
/**
 * 전화번호 유효성 검사 (본인 확인을 위해 필수정보로 설정)
 * - 앞의 3자리를 select로 번호를 받아 발생할 수 있는 케이스를 줄임
 */
const checkPhone = () => {
    const tempPhone2 = document.querySelector("#phone2").value;
    const phoneRegexp = /\d{7,8}/;
    
    if(tempPhone2 === ""){
        showMsg(phoneMsg, "❗필수 정보입니다.");
        return false;
    }
    if(!phoneRegexp.test(tempPhone2)){
        showMsg(phoneMsg, "❗전화번호를 다시 확인해주세요.");
        return false;
    }
    showMsg(phoneMsg, "✔");
    return tempPhone2;
};
//휴대전화(7자리) 체크
phone2.onblur = () => {
    checkPhone();
};

//----------------------------------이메일----------------------------------------
//이메일 유효성 검사
const checkEmailId = () => {
    const tempEmailId = document.querySelector("#emailId").value;
    const emailIdRegexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/;
    
    if(tempEmailId === ""){
        showMsg(emailMsg, "❗필수 정보입니다.");
        return false;
    }
    if(!emailIdRegexp.test(tempEmailId)){
        showMsg(emailMsg, "❗이메일 주소를 다시 확인해주세요.");
        return false;
    }

    //이메일아이디를 입력받은 후 이메일 주소 형식 처리
    // const tempEmailAddr = "";
    emailAddr.focus();
    
    // 이메일 주소 체크
    emailAddr.onblur = () => {
        checkEmailAddr();
    };
    return tempEmailId;
};

//이메일 아이디 체크
emailId.onblur = () => {
    checkEmailId();    
};

//이메일 주소 유효성 검사
const checkEmailAddr = () => {
    const tempEmailAddr = document.querySelector("#emailAddr").value;
    const emailAddrRegexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    
    if(emailAddr.value === ""){
        showMsg(emailMsg, "❗이메일 주소를 다시 확인해주세요.");
        return false;
    }
    if(!emailAddrRegexp.test(tempEmailAddr)){
        showMsg(emailMsg, "❗이메일 주소를 다시 확인해주세요.");
        return false;
    }
    showMsg(emailMsg, "✔");
    return tempEmailAddr;
};        

///////////////////////////////////////////////////////////////////////////////////////

//올바른 형식으로 입력했는지 바로 체크하고 피드백하기 위함 (네이버 회원가입 페이지 참조)
const showMsg = (obj, msg) => {
    obj.innerHTML = msg;
};

//초기화 버튼 클릭시 사용자에게 응답을 받아 처리
btn_reset.onclick = () => {
    const reset_ans = confirm("작성한 정보를 초기화하시겠습니까?");
    
    //초기화시 기존에 있던 입력값 관련 피드백 메세지 삭제 
    if(reset_ans){
        [...document.querySelectorAll(".message_box")].forEach((m) => {
            m.innerHTML = "";
        });
    }
    return reset_ans;
};

//가입하기 버튼 클릭 후 처리
document.memberFrm.onsubmit = () => {
    
    //회원가입 처리하기 이전에 최종 유효성 검사
    if(!checkId()){
        return re_input("아이디", userId);
    }
    if(!checkPwd()){
        return re_input("비밀번호", pwd);
    }
    if(!checkPwdCheck()){
        return re_input("비밀번호 확인", pwdCheck);
    }
    if(!checkName()){
        return re_input("이름", userName);
    }
    if(!checkPhone()){
        return re_input("휴대전화번호", phone2);
    }
    if(!checkEmailId()){
        return re_input("이메일 아이디", emailId);
    }
    if(!checkEmailAddr()){
        return re_input("이메일 주소", emailAddr);
    }

    //검사를 모두 통과하면 localStorage에 저장
    saveJoinMember();
    return true;
};

//사용자 입력값이 올바르지 않은데도 가입을 시도할 경우 출력 메세지
const re_input = (msg, ele) => {
    alert(`${msg} 입력을 다시 확인해주세요!😥`);
    ele.focus();       //잘못 입력된 input focus 처리
    return false;
};

class Member {
    constructor(userId, pwd, userName, birth, gender, phone, email, regDate = Date.now()){
        this.userId = userId;
        this.pwd = pwd;
        this.userName = userName;
        this.birth = birth;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.regDate = datetimeFormatter(regDate);
    }
}

//사용자 입력값 처리 후, localStorage에 data(회원가입 정보) 저장
const saveJoinMember = () => {
    //사용자 입력값 처리
    const userId = checkId();
    // console.log(userId);
    const pwd = checkPwd();
    // console.log(pwd);
    const userName = checkName();
    // console.log(userName);
    const birth = document.getElementById("birth").value;
    // console.log(birth);
    const gender = document.getElementById("gender").value;
    // console.log(gender);
    const phone1 = document.getElementById("phone1").value;
    // console.log(phone1);
    const phone = `${phone1}${checkPhone()}`;
    // console.log(phone);
    const email = `${checkEmailId()}@${checkEmailAddr()}`;
    // console.log(email);

    //member 객체 생성
    const member = new Member(userId, pwd, userName, birth, gender, phone, email);
    // console.log(member);

    //members 배열에 저장
    const members = JSON.parse(localStorage.getItem("members")) || [];
    members.push(member);
    // console.log(members);

    //json 객체로 변환
    const data = JSON.stringify(members);
    // console.log(data);

    //localstorage에 저장
    localStorage.setItem('members', data);

    //저장 완료되면 기존에 입력되어있던 값, 피드백 메세지 초기화
    document.memberFrm.reset();
    [...document.querySelectorAll(".message_box")].forEach((m) => {
            m.innerHTML = "";
    });
    //모두 완료되면 login페이지로 이동
    window.location.href = './login.html';
    alert('회원가입 성공!🎉');
    return true;
};

//확인하기 편하게 날짜 형식 변경
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

