window.onload = function() {

var WIDTH = HEIGHT = 7, BORDER = '3px groove #0A0',
    EMPTY = 0, MAXVAL = 10, RANDVAL = function() {
        return Math.random() * MAXVAL | 0 + 1
    }, SETEDITABLE = function(obj, answer, flag) {
        if (flag) obj.setAttribute('contentEditable', 'true')
        else obj.removeAttribute('contentEditable')

        if (flag) {
            obj.oncontextmenu = function(e) {
                e.preventDefault()
                if (confirm('Do you really want a hint?')) {
                    obj.innerHTML = answer
                    obj.style.backgroundColor = '#BFB'
                }
            }
        } else obj.oncontextmenu = null
    }

var squares = Array(WIDTH),
    table = document.createElement('table')

table.setAttribute('cellpadding', 3)
table.style.border = BORDER

for (var i = 0; i < squares.length; i ++) {
    var tr = document.createElement('tr')
    squares[i] = Array(HEIGHT)
    for (var i2 = 0; i2 < squares[i].length; i2 ++) {
        var td = document.createElement('td')

        td.width = td.height = 60
        td.style.border = BORDER
        td.style.textAlign = 'center'
        td.style.font = 'bold 30px sans-serif'

        /* if (i % 2 + i2 % 2 == 2) {
            td.style.backgroundColor = '#BBB'
        } */

        var starter = (i * i2 == 0 || i == WIDTH - 1 || i2 == HEIGHT - 1),
            val = RANDVAL()

        if (starter) td.innerHTML = val
        else SETEDITABLE(td, val, true)

        tr.appendChild(td)
        squares[i][i2] = {
            DOMObject: td,
            value: val
        }
    }
    table.appendChild(tr)
}

for (var i = 1; i < WIDTH - 1; i += 2) {
    for (var i2 = 1; i2 < HEIGHT - 1; i2 += 2) {
        var sq = squares[i][i2]
        sq.DOMObject.style.backgroundColor = '#BBB'
        SETEDITABLE(sq.DOMObject, sq.value, false)

        var sum = 0
        for (var i3 = -1; i3 <= 1; i3 ++) {
            for (var i4 = -1; i4 <= 1; i4 ++) {
                if (i3 || i4) sum += squares[i + i3][i2 + i4].value
            }
        }
        sq.value = sum

        sq.DOMObject.innerHTML = sq.value
    }
}

document.body.appendChild(table)

var mkipt = function(type, value) {
    var ipt = document.createElement('input')
    ipt.type = type
    ipt.value = value
    return ipt
}

var form = document.createElement('form'),
    gen = mkipt('submit', 'Generate new')

form.onsubmit = function(e) {
    // e.preventDefault()
}

form.appendChild(gen)
document.body.appendChild(form)

}