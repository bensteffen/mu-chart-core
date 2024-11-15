import { scaleLinear, interpolateRound } from 'd3'


export type interval = [number, number]

export type minmaxnum = 'min' | 'max' | number

export class Offset {
    constructor(xy: any = {}) {
      this.x = xy.x || 0
      this.y = xy.y || 0
    }
    x: number | string = 0
    y: number | string = 0
  }
  
  export class Size {
    width = 0
    height = 0
  }
  
  
  export class Scales {
    private _x = scaleLinear().interpolate(interpolateRound)
    private _y = scaleLinear().interpolate(interpolateRound)
    // public readonly x = scaleLinear()
    // public readonly y = scaleLinear()
  
    private _xRange: interval = [0, 1]
    private _yRange: interval = [0, 1]
    private _xDomain: interval = [Infinity, -Infinity]
    private _yDomain: interval = [Infinity, -Infinity]
  
    public x(value: minmaxnum): number {
      return this._x(this.parseDomainValue(value, this._xDomain))
    }
  
    public y(value: minmaxnum): number {
      return this._y(this.parseDomainValue(value, this._yDomain))
    }
  
    public xInvert(pixelValue: number): number  {
      return this._x.invert(pixelValue)
    }
  
    public yInvert(pixelValue: number): number  {
      return this._y.invert(pixelValue)
    }
  
    private parseDomainValue(value: minmaxnum, domain: interval): number {
      if (typeof value === 'number') {
        return value
      }
      if (typeof value === 'string') {
        if (value === 'min') {
          return domain[0]
        }
        if (value === 'max') {
          return domain[1]
        }
      }
      throw('Could not parse value: ' + value)
    }
  
    public get xScale() {
      return this._x
    }
  
    public get yScale() {
      return this._y
    }
  
    public get xRange() {
      return this._xRange
    }
    public set xRange(range: interval) {
      this._xRange = range
      this._x.range(range)
    }
  
    public get yRange() {
      return this._yRange
    }
    public set yRange(range: interval) {
      this._yRange = range
      this._y.range(range)
    }
  
    public get xDomain() {
      return this._xDomain
    }
    public set xDomain(domain: interval) {
      this._xDomain = domain
      this._x.domain(domain)
    }
  
    public get yDomain() {
      return this._yDomain
    }
    public set yDomain(domain: interval) {
      this._yDomain = domain
      this._y.domain(domain)
    }
}

export class Extents {
  constructor(
    x: interval = [Infinity, -Infinity],
    y: interval = [Infinity, -Infinity],
  ) {
    this.x = x
    this.y = y
  }

  public x: interval
  public y: interval

  public max(extents: Extents): Extents {
    return new Extents(
      this.maxInterval(this.x, extents.x),
      this.maxInterval(this.y, extents.y),
    )
  }

  public maxInterval(int1: interval, int2: interval): interval {
    return [Math.min(int1[0], int2[0]), Math.max(int1[1], int2[1])]
  }

  public isEqual(ext: Extents): boolean {
    return (
      this.x[0] === ext.x[0] &&
      this.x[1] === ext.x[1] &&
      this.y[0] === ext.y[0] &&
      this.y[1] === ext.y[1]
    )
  }
}

export class XYDataItem {
  constructor(x: number, y: number, value: string | number | null = null) {
    this.x = x
    this.y = y
    this.value = value
  }

  x: number
  y: number
  value?: string | number | null
}