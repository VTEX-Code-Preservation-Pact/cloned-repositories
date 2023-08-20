import React from 'react'
import { Circle, Line, Stage, Layer } from 'react-konva';
import { useProduct } from 'vtex.product-context';
import styles from './WineMeter.css'

function filterByValue(array: any[] | undefined, string: string) {
  if (array) {
    return array.filter(o =>
      Object.keys(o).some(k => o[k].includes(string.toLowerCase())));
  }

  return null;
}

function arrayToObject(arr: any[] | undefined, key: string) {
  if (arr) {
    // @ts-ignore
    return arr.reduce((obj, item) => {
      obj[item[key]] = item
      return obj
    }, {})
  }

  return null;
}

function Specs(this: any) {
  const productContextValue = useProduct();
  const attributes = productContextValue?.product?.properties;
  const filteredObj = filterByValue(attributes, 'winespec');

  // @ts-ignore
  return filteredObj.map((item: any) => (
    <div className={'vtex-wine-meter-1-x-winemeter-' + item.name}>
      { item.values[0] }
    </div>
  ));
}

function Canvas(this: any) {
  var corpLat: number,
      corpLong: number,
      fructeLat: number,
      fructeLong: number,
      dulceataLat: number,
      dulceataLong: number,
      aciditateLat: number,
      aciditateLong: number,
      taniniLat: number,
      taniniLong: number;

  const productContextValue = useProduct();
  const ceva = productContextValue?.product?.properties;
  const produs = arrayToObject(ceva, 'name');

  switch (produs.winemeter_corp.values[0]) {
    case '5': corpLat = 89; corpLong = 0; break;
    case '4': corpLat = 89; corpLong = 19; break;
    case '3': corpLat = 89; corpLong = 38; break;
    case '2': corpLat = 89; corpLong = 54; break;
    case '1': corpLat = 89; corpLong = 70; break;
    default: corpLat = 0; corpLong = 0; break;
  }

  switch (produs.winemeter_fructe.values[0]) {
    case '5': fructeLat = 180; fructeLong = 63; break;
    case '4': fructeLat = 158; fructeLong = 68; break;
    case '3': fructeLat = 142; fructeLong = 74; break;
    case '2': fructeLat = 125; fructeLong = 79; break;
    case '1': fructeLat = 106; fructeLong = 82; break;
    default: fructeLat = 0; fructeLong = 0; break;
  }

  switch (produs.winemeter_dulceata.values[0]) {
    case '5': dulceataLat = 144; dulceataLong = 159; break;
    case '4': dulceataLat = 133; dulceataLong = 144; break;
    case '3': dulceataLat = 121; dulceataLong = 130; break;
    case '2': dulceataLat = 111; dulceataLong = 117; break;
    case '1': dulceataLat = 101; dulceataLong = 104; break;
    default: dulceataLat = 0; dulceataLong = 0; break;
  }

  switch (produs.winemeter_aciditate.values[0]) {
    case '5': aciditateLat = 34; aciditateLong = 159; break;
    case '4': aciditateLat = 45; aciditateLong = 144; break;
    case '3': aciditateLat = 57; aciditateLong = 130; break;
    case '2': aciditateLat = 67; aciditateLong = 118; break;
    case '1': aciditateLat = 78; aciditateLong = 105; break;
    default: aciditateLat = 0; aciditateLong = 0; break;
  }

  switch (produs.winemeter_tanini.values[0]) {
    case '5': taniniLat = 1; taniniLong = 64; break;
    case '4': taniniLat = 19; taniniLong = 69; break;
    case '3': taniniLat = 37; taniniLong = 73; break;
    case '2': taniniLat = 54; taniniLong = 78; break;
    case '1': taniniLat = 70; taniniLong = 84; break;
    default: taniniLat = 0; taniniLong = 0; break;
  }

  return (
    <Stage width={178} height={160}>
      <Layer>
        <Line
          x={0}
          y={0}
          points={[corpLat, corpLong, fructeLat, fructeLong, dulceataLat, dulceataLong, aciditateLat, aciditateLong, taniniLat, taniniLong]}
          closed
          stroke="black"
          strokeWidth={0}
          fill="rgba(255, 221, 28, .5)"
        />
        <Circle x={corpLat} y={corpLong} radius={50} fill="black" width={10} height={10} />
        <Circle x={fructeLat} y={fructeLong} radius={50} fill="black" width={10} height={10} />
        <Circle x={dulceataLat} y={dulceataLong} radius={50} fill="black" width={10} height={10} />
        <Circle x={aciditateLat} y={aciditateLong} radius={50} fill="black" width={10} height={10} />
        <Circle x={taniniLat} y={taniniLong} radius={50} fill="black" width={10} height={10} />
      </Layer>
    </Stage>
  );
}

function WineMeter() {
  return (
    <div className={styles.graph} data-corp="3" data-tanini="3" data-fructe="4" data-dulceata="3" data-aciditate="3">
      <div className="vtex-wine-meter-1-x-winemeter-logo"/>
      <div className={styles.scalingSvgContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 321.27 286.32" className={styles.scalingSvg}>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_2-2" data-name="Layer 2">
              <path className={styles.cls1}
                    d="M157.4,39.56,41.88,119.91a5.67,5.67,0,0,0-2.12,6.52L83.26,251a5.67,5.67,0,0,0,5.35,3.8h144A5.67,5.67,0,0,0,238,251l43.5-124.58a5.67,5.67,0,0,0-2.12-6.52L163.87,39.56A5.67,5.67,0,0,0,157.4,39.56Z"></path>
              <path className={styles.cls1}
                    d="M157.88,65.12,67.53,128a4.82,4.82,0,0,0-1.8,5.54l34,97.42a4.82,4.82,0,0,0,4.55,3.23H217a4.82,4.82,0,0,0,4.55-3.23l34-97.42a4.82,4.82,0,0,0-1.8-5.54L163.39,65.12A4.82,4.82,0,0,0,157.88,65.12Z"></path>
              <path className={styles.cls1}
                    d="M158.21,89,91.53,135.39a4.25,4.25,0,0,0-1.59,4.89L115,212.1a4.25,4.25,0,0,0,4,2.85h83.21a4.25,4.25,0,0,0,4-2.85l25.08-71.82a4.25,4.25,0,0,0-1.59-4.89L163.06,89A4.25,4.25,0,0,0,158.21,89Z"></path>
              <path className={styles.cls1}
                    d="M158.69,110.87l-45.26,31.48a3.4,3.4,0,0,0-1.27,3.91l17,48.7a3.4,3.4,0,0,0,3.21,2.28h56.51A3.4,3.4,0,0,0,192.1,195l17-48.7a3.4,3.4,0,0,0-1.27-3.91l-45.26-31.48A3.4,3.4,0,0,0,158.69,110.87Z"></path>
              <path className={styles.cls1}
                    d="M159,133.61l-22.74,15.82a2.83,2.83,0,0,0-1.06,3.26L143.73,177a2.83,2.83,0,0,0,2.68,1.9h28.46a2.83,2.83,0,0,0,2.68-1.9L186,152.69a2.83,2.83,0,0,0-1.06-3.26l-22.74-15.82A2.83,2.83,0,0,0,159,133.61Z"></path>
            </g>
          </g>
        </svg>
      </div>
      <div className={styles.labels}>
        <span data-toggle="tooltip"
              title="Corpul vinului este dat de alcool si de extractul strugurelui. Cu cat vinul este mai corpolent, cu atat este mai dens."
              className={styles.labelCorp}>Corp</span>
        <span data-toggle="tooltip"
              title="O concentratie mai mare de tanini, ofera vinului un gust putin amarui care ne “face gura punga”."
              className={styles.labelTanini}>Tanini</span>
        <span data-toggle="tooltip"
              title="Nivelul fructelor determina daca vinul are gust si arome accentuate de fructe sau acestea lipsesc."
              className={styles.labelFructe}>Fructe</span>
        <span data-toggle="tooltip"
              title="Nivelul de dulceata ofera vinului un gust mai dulce sau mai acrisor, chiar daca el este sec."
              className={styles.labelDulceata}>Dulceata</span>
        <span data-toggle="tooltip"
              title="Aciditatea scazuta ofera vinului un gust “plat”, aciditatea mare un gust acrisor si astringent."
              className={styles.labelAciditate}>Aciditate</span>
      </div>
      <div className={styles.pentagon} id="5-factors">
        <div className={styles.pentCanvas}>
          { Canvas() }
        </div>
      </div>
      <div className="vtex-wine-meter-1-x-winemeter-winespecs">
        { Specs() }
      </div>
    </div>
  )
}

export default WineMeter;
