const POINTS_HEADER_X = "x"
const POINTS_HEADER_F = "f(x)"
const POINTS_TABLE_MARGIN = 1
const POINTS_TABLE_H_SEP = '═'
const POINTS_TABLE_X_SEP = '╬'
const POINTS_TABLE_V_SEP = '║'

class NevAit {
    constructor(support_points) {
        this.support_points = support_points
        if (typeof(support_points[0].x == 'undefined')) {
            // Map tuples to object points
            this.support_points = this.support_points.map(tuple => {return {x: new Fraction(tuple[0]), y: new Fraction(tuple[1])}})
        } else { 
            this.support_points = this.support_points.map(tuple => {return {x: new Fraction(tuple.x), y: new Fraction(tuple.y)}})
        }
        this.p_list = [[]]
        this.number_space = 2   // Space that will be available for a single number without destroying the output string
        this.single_line = true // If set to false, will print more elaborate
    }

    p(k, l, x) {
        if (k == l) {
            return this.support_points[k].y
        }

        // Create row in p_list if not existing
        if (this.p_list[k] === undefined) {
            this.p_list[k] = []
        }

        // Calculate the p if it has not been yet
        if (this.p_list[k][l] === undefined) {
            // Fetch xk and xl
            const xk = this.support_points[k].x
            const xl = this.support_points[l].y
        
            // Calculate divided difference
            this.p_list[k][l] = (x.sub(xk).mul(this.p(k + 1, l, x)).sub(x.sub(xl).mul(this.p(k, l - 1, x)))).div(xl.sub(xk))
        }

    
        // console.log(`(${x}-${xk})*${this.p(k + 1, l, x)} - (${x}-${xl})*${this.p(k, l - 1, x)}`)
        // console.log('--------------------------------')
        // console.log(`${xl}-${xk}`)
        // console.log(`P${k},${l} = ${numerator} / ${denumerator} = ${result}`)
        // console.log()
        // p_list[k] = result
    
        return this.p_list[k][l]
    }

    evaluate(x) {
        const k = new Fraction(0)
        const l = new Fraction(this.support_points.length - 1)
        x = new Fraction(x)

        // Reset p_list
        this.p_list = []

        return this.p(k, l, x)
    }

    getPointTableHeader() {
        let header = this.getPointsTableEntry(POINTS_HEADER_X, POINTS_HEADER_F)
        const row_length = header.length

        header += "\n"
        if (this.single_line) {
            header = " ".repeat(row_length) + "\n" + header + " ".repeat(row_length) + "\n"
        }

        header += POINTS_TABLE_H_SEP.repeat(row_length)
        return header + "\n"
    }

    getPointTableCellWidth() {
        return Math.max(this.number_space,
                        POINTS_HEADER_F.length,
                        POINTS_HEADER_X.length);
    }

    getLineHeight() {
        if (this.single_line) {
            return 1
        } else {
            return 3
        }
    }

    getPointsTableRow(r) {
        
    }

    getPointsTableEntry(a, b) {
        a = a.padStart(this.getPointTableCellWidth(), " ");
        b = b.padStart(this.getPointTableCellWidth(), " ");

        let margin = ""
        if (POINTS_TABLE_MARGIN > 0) {
            margin = " ".repeat(POINTS_TABLE_MARGIN)
        }
            
        return margin + a + margin + POINTS_TABLE_V_SEP + margin + b + margin
    }

    toString(x) {
        this.evaluate(x)

        let result = this.getPointTableHeader()

        // Row count:
        // 2 * #SupportPoints so that there is a row for every suppport point and a row inbetween
        // - 1 Remove last and empty row
        const row_count = 2 * this.support_points.length - 1
        
        // Generate row by row
        for (let row = 0; row < row_count; row++) {
            result += this.getPointsTableRow(row);
        }

        return result
    }
}
