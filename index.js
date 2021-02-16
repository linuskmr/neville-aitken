function parse_input() {
    // Parse support points
    let support_points = document.getElementById('support_points_input').value
    // Convert tuple notation () to array notation [] to be able to parse it as json
    support_points = support_points.replaceAll('(', '[').replaceAll(')', ']')
    support_points = JSON.parse(support_points)

    // Parse number
    const x = Number(document.getElementById('x_input').value)
    return {x, support_points}
}

function render_nev_ait() {
    try {
        const input = parse_input()
    } catch(e) {
        alert(e)
    }
    const n = new NevAit(input.support_points)
    const result = n.toString(input.x)
    document.getElementById("output").innerHTML = result
}


// Add automatic calculation on enter
document.getElementById('support_points_input').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        render_nev_ait()
    }
});

// Add automatic calculation on enter
document.getElementById('x_input').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        render_nev_ait()
    }
});
