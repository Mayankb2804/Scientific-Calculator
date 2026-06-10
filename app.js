const inv = document.querySelector(".inv");
const sin = document.querySelector(".sin");
const cos = document.querySelector(".cos");
const tan = document.querySelector(".tan");
const lg = document.querySelector(".lg");
const ln = document.querySelector(".ln");
const sqroot = document.querySelector(".sqroot");
const msg = document.querySelector(".msg-container")
const ans = document.querySelector(".ans")
const clearbtn = document.querySelector(".clearbtn")
const power = document.querySelector(".power")
const numb = document.querySelectorAll(".number")
const op = document.querySelectorAll(".op")
const degBtn = document.querySelector(".deg");
const radBtn = document.querySelector(".rad");
const fact = document.querySelector(".fact")
const constπ = document.querySelector(".constπ")
const conste = document.querySelector(".conste")
const reciprocal = document.querySelector(".reciprocal")
const history = document.querySelector(".history")
let inverseMode = false;
let deg = true;
function factorial(n) {
    if (n < 0) return NaN;

    let ans = 1;
    for (let i = 2; i <= n; i++) {
        ans *= i;
    }
    return ans;
}
inv.addEventListener("click", () => {
    inverseMode = !inverseMode;

    if (inverseMode) {
        sin.innerHTML = "sin<sup>-1</sup>";
        cos.innerHTML = "cos<sup>-1</sup>";
        tan.innerHTML = "tan<sup>-1</sup>";
        lg.innerText = "10^x";
        ln.innerText = "e^x";
        sqroot.innerText = "x²";
    } else {
        sin.innerText = "sin";
        cos.innerText = "cos";
        tan.innerText = "tan";
        lg.innerText = "log";
        ln.innerText = "ln";
        sqroot.innerText = "√";
    }
});
degBtn.classList.add("active-mode");
numb.forEach(button => {
    button.addEventListener("click", () => {
        console.log("clicked");
        msg.innerText += button.innerText;
    });
});
op.forEach(button => {
    button.addEventListener("click", () => {
        console.log("clicked");
        msg.innerText += button.innerText;
    });
});
ans.addEventListener("click", () => {
    try {
        const expression = msg.innerText;
        let exp = msg.innerText
            .replace(/\^/g, "**")
            .replace(/√\(/g, "Math.sqrt(")
            .replace(/(\d+)!/g, (_, n) => factorial(Number(n)))
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/log\(/g, "Math.log10(")
            .replace(/ln\(/g, "Math.log(");
        
        if (deg) {
            exp = exp
                .replace(/sin\(/g, "Math.sin(Math.PI/180*")
                .replace(/cos\(/g, "Math.cos(Math.PI/180*")
                .replace(/tan\(/g, "Math.tan(Math.PI/180*");
        } else {
            exp = exp
                .replace(/sin\(/g, "Math.sin(")
                .replace(/cos\(/g, "Math.cos(")
                .replace(/tan\(/g, "Math.tan(");
        }

        exp = exp
            .replace(/Math\.sin\(Math\.PI\/180\*⁻¹/g, "Math.asin")
            .replace(/Math\.cos\(Math\.PI\/180\*⁻¹/g, "Math.acos")
            .replace(/Math\.tan\(Math\.PI\/180\*⁻¹/g, "Math.atan")
            .replace(/sin⁻¹\(/g, "Math.asin(")
            .replace(/cos⁻¹\(/g, "Math.acos(")
            .replace(/tan⁻¹\(/g, "Math.atan(");

        let result = eval(exp);

        if (
            deg &&
            (
                msg.innerText.includes("sin⁻¹(") ||
                msg.innerText.includes("cos⁻¹(") ||
                msg.innerText.includes("tan⁻¹(")
            )
        ) {
            result = result * 180 / Math.PI;
        }
        msg.innerText = result;
        history.innerText += `${expression} = ${result}\n`;
    } catch (error) {
        console.log(error);
        history.innerText += `${expression} = Error\n`;
        msg.innerText = "Error";
    }
});
clearbtn.addEventListener("click",()=>{
    msg.innerText = msg.innerText.slice(0, -1); 
});
clearbtn.addEventListener("dblclick",()=>{
    msg.innerText = ""
});

sqroot.addEventListener("click", () => {
    if (sqroot.innerText === "√")
        msg.innerText += "√(";
    else
        msg.innerText += "**2";
});

lg.addEventListener("click", () => {
    if (inverseMode)
        msg.innerText += "10^";
    else
        msg.innerText += "log(";
});

ln.addEventListener("click", () => {
    if (inverseMode)
        msg.innerText += "e^";
    else
        msg.innerText += "ln(";
});

reciprocal.addEventListener("click", () => {
    msg.innerText += "^(-1)";
});

power.addEventListener("click",()=>{
    msg.innerText += "^"
})
sin.addEventListener("click", () => {
    if (inverseMode) {
        msg.innerText += "sin⁻¹(";
    } else {
        msg.innerText += "sin(";
    }
});
cos.addEventListener("click", () => {
    if (inverseMode) {
        msg.innerText += "cos⁻¹(";
    } else {
        msg.innerText += "cos(";
    }
});

tan.addEventListener("click", () => {
    if (inverseMode) {
        msg.innerText += "tan⁻¹(";
    } else {
        msg.innerText += "tan(";
    }
});
degBtn.addEventListener("click", () => {
    deg = true;

    degBtn.classList.add("active-mode");
    radBtn.classList.remove("active-mode");
});

radBtn.addEventListener("click", () => {
    deg = false;

    radBtn.classList.add("active-mode");
    degBtn.classList.remove("active-mode");
});
fact.addEventListener("click",()=>{
    msg.innerText += "!";
})
constπ.addEventListener("click",()=>{
    msg.innerText += "π";
})
conste.addEventListener("click",()=>{
    msg.innerText += "e";
})
