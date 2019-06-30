import React from 'react';
import logo from './logo.svg';
import './App.css';

class InputForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            issuekey: "",
            type: "",
            resultToText: []
        };

        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleLifespanChange = this.handleLifespanChange.bind(this);
        this.handleLabelSubmit = this.handleLabelSubmit.bind(this);
        this.handleTypeSubmit = this.handleTypeSubmit.bind(this);
        this.handleLifespanSubmit = this.handleLifespanSubmit.bind(this);
    }

    handleLabelChange(event) {
        this.setState({label: event.target.value});
    }

    handleTypeChange(event) {
        this.setState({type: event.target.value});
    }

    handleLifespanChange(event) {
        this.setState({issuekey: event.target.value});
    }

    handleLabelSubmit(event) {
        fetch("http://localhost:3001/tasklabels?labels=" + this.state.label, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error(res.statusText);
                }
            })
            .then(json => {
                console.log(json);
                this.setState(
                    {
                        resultToText: JSON.stringify(json)
                    }
                )
            });
    }

    handleTypeSubmit(event) {
        fetch("http://localhost:3001/taskcount?typeid=" + this.state.type, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error(res.statusText);
                }
            })
            .then(json => {
                console.log(json);
                this.setState(
                    {
                        resultToText: JSON.stringify(json)
                    }
                )
            });
    }

    handleLifespanSubmit(event) {
        console.log(this.state.issuekey)
        fetch("http://localhost:3001/tasklifespan?issuekey=" + this.state.issuekey, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error(res.statusText);
                }
            })
            .then(json => {
                console.log(json);

                var realDifference = json.difference / 1000;
                var differenceInDays = Math.trunc(realDifference / (60 * 60 * 24));

                if (differenceInDays > 0) {
                    differenceInDays = differenceInDays + " дней";
                } else if (differenceInDays === 0) {
                    differenceInDays = "Меньше суток";
                } else {
                    differenceInDays = "Задача не завершена";
                }

                this.setState(
                    {
                        resultToText: differenceInDays
                    }
                )
            });

    }

    render() {
        return (
            <div>
                <li>
                    <form>
                        <label>
                            Поиск по типу:
                            <input type="text" name="name" onChange={this.handleTypeChange}/>
                        </label>
                        <button onClick={this.handleTypeSubmit} id="button" type="button" value="send"
                                className="btn btn-primary">Отправить
                        </button>
                    </form>
                </li>
                <li>
                    <form>
                        <label>
                            Поиск по метке:
                            <input type="text" name="name" onChange={this.handleLabelChange}/>
                        </label>
                        <button onClick={this.handleLabelSubmit} id="button" type="button" value="send"
                                className="btn btn-primary">Отправить
                        </button>
                    </form>
                </li>
                <li>
                    <form>
                        <label>
                            Время жизни таска:
                            <input type="text" name="name" onChange={this.handleLifespanChange}/>
                        </label>
                        <button onClick={this.handleLifespanSubmit} id="button" type="button" value="send"
                                className="btn btn-primary">Отправить
                        </button>
                    </form>
                </li>

                <a>{this.state.resultToText}</a>
            </div>
        );
    }
}

function App() {

    return (
        <div className="App">

            <InputForms/>

        </div>
    );
}

export default App;
