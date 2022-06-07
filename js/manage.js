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
const renderMember = () => {
    let members = [];
    members = JSON.parse(localStorage.getItem("members"));
    console.log(members);

    const tbody = document.querySelector("#tb-member tbody");
    tbody.innerHTML = "";

    members
        .map((member, index) => {
            const {userId, pwd, userName, birth, gender, phone, email, regDate} = member;
            return `<tr>
                <td>${index+1}</td>
                <td>${userId}</td>
                <td>${pwd}</td>
                <td>${userName}</td>
                <td>${birth}</td>
                <td>${gender}</td>
                <td>${phone}</td>
                <td>${email}</td>
                <td>${regDate}</td>
            </tr>`;
        })
        .forEach((tr) => {
            tbody.innerHTML += tr;
        });
};
window.onload = () => {
    renderMember();
    return true;
};