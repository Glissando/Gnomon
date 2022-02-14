console.log("simplying expressions");


function visualize()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let value = input.value
    let a = 0
    let b = 0
    console.log(value)
    try
    {
        let values = value.split("=")
        if (values.length > 2)
        {
            setInvalid()
            return
        }
        else if (values.length == 2)
        {
            let expression1 = math.simplify(values[0]).toString();
            let expression2 = math.simplify(values[1]).toString();
            let expression = math.simplify(expression1 + "-(" + expression2 + ")").toString()
            console.log(expression)
            const ret = math.rationalize(expression,{},true)
            let coefficients = ret.coefficients
            if (coefficients.length !== 3 || coefficients[0] === 0)
            {
                setInvalid()
                return
            }
            else
            {
                b = coefficients[0]
                a = coefficients[1]
                let aSign = Math.sign(a)

                if (aSign !== Math.sign(b) && aSign !== Math.sign(coefficients[2]) && coefficients[2] === 1 
                && Math.sqrt(Math.abs(b)) < Math.abs(a / 2))
                {
                    setValid()
                    a = Math.abs(a)
                    b = Math.sqrt(Math.abs(b))
                    drawGnomon(a, b)
                }
                else
                {
                    setInvalid()
                }
            }
        }
        else
        {
            let expression = math.simplify(value).toString();
            console.log(expression)
            const ret = math.rationalize(expression,{},true)
            let coefficients = ret.coefficients
            let aSign = Math.sign(ret.coefficients[1])
            if (coefficients.length !== 3 || coefficients[0] === 0)
            {
                setInvalid()
                return
            }
            else
            {
                b = coefficients[0]
                a = coefficients[1]
                let aSign = Math.sign(a)

                if (aSign !== Math.sign(b) && aSign !== Math.sign(coefficients[2]) && coefficients[2] === 1 
                && Math.sqrt(Math.abs(b)) < Math.abs(a / 2))
                {
                    setValid()
                    a = Math.abs(a)
                    b = Math.sqrt(Math.abs(b))
                    drawGnomon(a, b)
                }
                else 
                {
                    setInvalid()
                }
            }
            console.log(ret.coefficients)
        }
    }
    catch(error)
    {
        console.log(error)
        setInvalid()
    }
}

function drawGnomon(a, b)
{
    a = Math.min(a, canvas.width)
    b = b * (canvas.width / a)
    a = canvas.width
    let AC = Math.round(a/2)
    let c = Math.sqrt(AC*AC-b*b)
    let DB = AC - c

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.rect(0, 0, AC * 2, DB)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.rect(AC, 0, c, DB + c)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.rect(AC + c, 0, DB, DB + c)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.arc(AC + c, DB, (DB + c) / 10, Math.PI, Math.PI / 2)
    ctx.stroke()
}

function setInvalid()
{
    label.innerHTML = "Invalid"
    label.setAttribute("id", "invalid");
}

function setValid()
{
    label.innerHTML = "Valid"
    label.setAttribute("id", "valid");
}

let input = document.getElementById("expression")
let label = document.getElementsByClassName("Input-label")[0]
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

input.addEventListener('input', visualize, true)
//# sourceMappingURL=calculate.js.map
