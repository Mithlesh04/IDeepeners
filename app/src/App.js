import React from 'react'
import './App.css';


const TempData = {
    metric: ["7-May-21", "6-May-21", "5-May-21", "4-May-21", "3-May-21", "2-May-21", "1-May-21"],
    data: {

        "Google Ads": {
            color: 'red',
            data: [
                {
                    field: 'Clicks',
                    values: [110, 100, 100, 200, 100, 110, 100],
                },
                {
                    field: 'Conversions',
                    values: [100, 100, 220, 200, 100, 110, 100],
                },
                {
                    field: 'Cost/Conversion',
                    values: ["$1.25", "$1.5", "$1.5", "$1.5", "$1.25", "$1.5", "$1.5"],
                },
                {
                    field: 'ROAS',
                    values: ['2%', '5%', '7%', '2%', '2%', '5%', '2%'],
                },
            ]

        },
        "Facebook Ads": {
            color: 'blue',
            data: [
                {
                    field: 'Clicks',
                    values: [110, 100, 100, 200, 100, 110, 100],
                },
                {
                    field: 'Conversions',
                    values: [100, 100, 220, 200, 100, 100, 100],
                },
                {
                    field: 'Cost/Conversion',
                    values: ["$1.25", "$1.5", "$1.5", "$1.5", "$1", "$1.25", "$1.5"],
                },
                {
                    field: 'ROAS',
                    values: ['5%', '2%', '2%', '2%', '2%', '4%', '2%'],
                },
            ]

        }

    }
}



export class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: TempData,
        }

        this.isObject = this.isObject.bind(this)
        this.Metric = this.Metric.bind(this)
        this.Fields = this.Fields.bind(this)

    }

    isObject(d) {
        return d && 'object' === typeof d && !Array.isArray(d)
    }

    Metric() {
        let m = this.state.data
        if (this.isObject(m)) {
            return <div className="row">
                {(m?.metric || []).map((v, i) =>
                    <React.Fragment key={v + Math.random() * 6 + i}>
                        {
                            !i && <div className="col-2 p-2 text-center rounded" style={{ background: 'white', fontWeight: 600 }}>
                                <div style={{ textAlign: 'left', marginLeft: 10, fontSize: 18 }}>Metric</div>
                            </div>
                        }
                        <div className="col p-2 text-center rounded" style={{ maxWidth: 90, background: 'white', marginRight: 5 }}>
                            {v}
                        </div>
                    </React.Fragment>
                )}
            </div>
        } else return null
    }

    Fields() {
        let d = this.state.data?.data
        if (this.isObject(d)) {
            return Object.keys(d).map((k, i) => {
                k = d[k]
                if (this.isObject(k)) {
                    let d = k?.data, color = { background: k?.color ? k?.color : 'none' }
                    if (Array.isArray(d)) {
                        return d.map((v, i) => {
                            if (this.isObject(v)) {
                                let field = v?.field, val = v?.values
                                if (Array.isArray(val) && field) {
                                    return <div className="row pt-1" key={field + Math.random()}>
                                        {
                                            val.map((e, i) => {
                                                let currVal = Number(String(e)?.replace(/[^0-9\.]/g, '')), preVal = Number(String(val[i + 1])?.replace(/[^0-9\.]/g, '')), greater = false, percentage = false
                                                if ((currVal !== '' && currVal !== null) && (preVal !== '' && preVal !== null)) {
                                                    greater = (currVal > preVal) && val[i + 1]
                                                    if (greater) {
                                                        percentage = (currVal - preVal) / preVal * 100
                                                    }
                                                }

                                                return <React.Fragment key={e + i + Math.random()}>
                                                    {
                                                        !i && <div className="col-2 p-2 text-center rounded" style={{ background: 'white', display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ width: 5, height: 5, borderRadius: '100%', ...color, marginLeft: 10 }}></div>
                                                            <div style={{ textAlign: 'left', marginLeft: 10 }}>{field}</div>
                                                        </div>
                                                    }
                                                    <div className="col p-2 pl-0 pr-0 text-center rounded align-self-center" style={{ ...(greater ? { background: '#06bb67', color: 'white', fontWeight: 500 } : { background: 'white' }), marginRight: 5, maxWidth: 90 }}>
                                                        {e}<span style={{ fontSize: 12, marginLeft: 5 }}>{percentage && "+" + percentage + "%"}</span>
                                                    </div>
                                                </React.Fragment>
                                            })
                                        }
                                    </div>
                                } else return null
                            } else return null
                        })
                    } else return null
                } else return null
            })

        } else return null
    }

    render() {
        let d = this.state.data?.data
        return (
            <div className="container pt-3">
                <div className="pb-2">
                    <h6>Overview Table</h6>
                    <div className="row">
                        {
                            this.isObject(d) && (Object.keys(d || {})).map((k, i) => {
                                let c = d[k]?.color
                                return <div key={k + i} className="col-2 p-0 m-0" style={{ maxWidth: 130, display: 'flex', alignItems: 'center', color: '#a29b9b' }}>
                                    {c && <div style={{ width: 5, height: 5, borderRadius: '100%', background: c, marginLeft: 10 }}></div>}

                                    <div style={{ marginLeft: 10 }}>{k}</div>
                                </div>
                            })
                        }
                    </div>
                </div>

                <this.Metric />
                <this.Fields />
            </div>
        )
    }

}


export default App;
