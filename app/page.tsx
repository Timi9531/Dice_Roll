'use client'
import React from 'react'
import styles from './styles.module.css'
import { useState } from 'react'
import Image from 'next/image'
import dice_1 from './resources/inverted-dice-1.svg'
import dice_2 from './resources/inverted-dice-2.svg'
import dice_3 from './resources/inverted-dice-3.svg'
import dice_4 from './resources/inverted-dice-4.svg'
import dice_5 from './resources/inverted-dice-5.svg'
import dice_6 from './resources/inverted-dice-6.svg'

type DiceMap = {
  [key: number]: string
}

const dices: DiceMap = {
  1: dice_1,
  2: dice_2,
  3: dice_3,
  4: dice_4,
  5: dice_5,
  6: dice_6,
}
const page = () => {
  const [dice_count, set_dice] = useState(1); 
  const [dice_elements, set_dice_elements] = useState<React.ReactNode[]>([]);
  const [sum, set_sum] = useState(0);

  React.useEffect(() => {
    generate_dice(dice_count);
  }, [dice_count]);

  function generate_dice(dice_number:number) {
    let dice_elements = [];
    let sum = 0;
    for(let i = 1; i < dice_number+1; i++) {
      let value = randomIntFromInterval(1, 6);
      sum += value;
      let element = React.createElement(Image, {
        key: i,
        src: dices[value],
        alt: 'dice',
        width: 100,
        height: 100
      } )
      dice_elements.push(element);
      
    }
    set_dice_elements(dice_elements);
    set_sum(sum);
  }
  function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  const handle_decrease = () => {
    if (dice_count > 1) {
      set_dice(dice_count - 1);
    }
  }

  const handle_increase = () => {
    if (dice_count < 10) {
      set_dice(dice_count + 1);
    }
  }

  return (
    <>
      <div className={styles.main}>
        <h1>Roll the dice</h1>
        <div className={styles.dice_container}>
          {dice_elements}
        </div>
        <div>
          <button className={styles.btn} onClick={handle_decrease}>&lt;</button>
          <button className={styles.btn} onClick={() => generate_dice(dice_count)}>Roll</button> 
          <button className={styles.btn} onClick={handle_increase}>&gt;</button>
          <p className={styles.dice_count}>{dice_count}</p>
          <div className={styles.sum}>Sum: {sum}</div>
        </div>
      </div>
    </>
    )
}

export default page
