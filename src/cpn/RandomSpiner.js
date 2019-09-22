import React, { Component } from 'react'

class IndexItem {
    constructor(value) {
        this.value = value
        this.index = undefined
    }
}

export class RandomSpiner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            randomValue: "???"

        }
    }
    play() {
        const { items } = this.props;
        this.start(this.buildPool(items))
    }

    mappingItems(items) {
        return items.map(x => new IndexItem(x))
    }

    iterationsSpinnerList(multiplier, items) {
        let myArray = [];

        // Multiply the items Array by 'n' amount times
        for (let x = 0; x <= multiplier; x++) {
            myArray.push(items);
        }

        // Flatten
        return myArray.reduce(function (a, b) {
            return a.concat(b);
        });
    }

    dedupeSiblings(items) {
        return items.filter((value, index, array) => {
            if (value !== array[index - 1]) {
                return value;
            }
        });
    }

    randomizeSpinnerArray(items) {
        return items.sort(this.randOrd);
    }

    randOrd() {
        return Math.round(Math.random()) - 0.5;
    }

    start(items) {
        console.log(items)
        function* generator() {
            let index = 0;
            for (let item of items) {
                item.index = index++;
                setTimeout(onChange.bind(this), this.delayAlgorithm(item.index, 60, 100));
                yield item;
            }
        }

        var it = generator.call(this)

        var onChange = () => {
            let item = it.next();
            console.log(item.value)
            if (!item.value) {
                console.log(item.value)
                return;
            }

            this.setState({ end: false, randomValue: item.value.value });
        };

        onChange();
    }

    delayAlgorithm(currentStep, iterations, delay) {
        if (currentStep > (iterations * .70)) {
            let stepsRemainingCounter = (currentStep - (iterations * .70));
            return delay + (stepsRemainingCounter * stepsRemainingCounter);
        }

        return delay;
    }

    buildPool() {
        let pool = this.mappingItems(this.props.items)
        pool = this.iterationsSpinnerList(60 / pool.length, pool);
        pool = this.randomizeSpinnerArray(pool);
        pool = this.dedupeSiblings(pool);

        return pool;
    }

    render() {
        const { randomValue } = this.state;
        return (
            <div style={{ backgroundColor: 'white', display:'flex',alignItems:'center', justifyContent:'center' }}>
                <div>{randomValue}</div>
            </div>
        )
    }
}


export default RandomSpiner
