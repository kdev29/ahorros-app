class AhorrosApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movimientos: []
        };
    }

    componentDidMount() {
        console.log('component mounted');
        try {
            $.get('/api/movimientos', function (data) {
                console.log(data);
                
                var jsArray = eval(data);

                this.setState({ movimientos: this.state.movimientos.concat(jsArray) });


            }.bind(this));

        } catch (e) {
            alert(e)
        }
        
    }

    handleAddMovimiento(e, childState) {
        console.log('en handleAddMovimiento');
        var newMovements = [];
        var newMov = {
            monto: childState.cantidad,
            cuenta: childState.cuenta.descripcion,
            tipo: childState.tipo,
            idMovimiento: 0,
            comentario: childState.comentario
        };

        newMovements.push(newMov);

        this.setState({ movimientos: this.state.movimientos.concat(newMovements) });
    }

    handleSaveMovimientosApp(e) {
        console.log('guardando en el server');

        var counter = 0;
        var movimientosLength = this.state.movimientos.length;

        this.state.movimientos.forEach(element => {
            counter++;
            if (element.idMovimiento == 0) {

                var payload = element;

                $.ajax({
                    url: '/api/movimientos/save',
                    data: payload,
                    method: 'POST'
                })
                    .done(function (data) {
                        console.log('ajax done -> ' + data);   

                        if (counter == movimientosLength)
                            window.location = window.location;
                    })
                    .fail(function (data) {
                        console.log('ajax fail -> ' + data);
                        if (counter == movimientosLength)
                            window.location = window.location;
                    });

                e.target.innerText = "Guardando."; e.target.innerText = "Guardando.."; e.target.innerText = "Guardando...";
            }

            

        });


    }

    render() {

        const movimientosRender = this.state.movimientos.map((element, index) => {
            return (
                <li key={index}>
                    ${element.monto}
                    Cuenta: {element.cuenta}
                    Fecha: {element.fecha}
                    Tipo: {element.tipo} Id: {element.idMovimiento}
                </li>
            );
        });

        const movimientosRenderTable = this.state.movimientos.map(function (element, index) {
            return (
                <tr key={index}>
                    <td><a href={'/Home/Movimiento/' + element.idMovimiento }>{element.idMovimiento}</a></td>
                    <td>{element.cuenta} </td>
                    <td>{element.tipo}</td>
                    <td>{element.monto}</td>
                    <td>{element.fecha}</td>
                    <td>{element.comentario}</td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Hello ahorros</h2>                
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cuenta</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Comentario</th>
                    </tr>
                    </thead>
                    <tbody>
                        {movimientosRenderTable}
                        </tbody>
                </table>
                <AddAhorro onAddMovimiento={(e, c) =>
                    this.handleAddMovimiento(e, c)}
                />
                <div>
                    <button
                        className='btn'
                        onClick={(e) =>
                        this.handleSaveMovimientosApp(e)}
                    >Guardar movimientos
                    </button>
                </div>
            </div>

        );
    }
}

class AddAhorro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tipo: 'Ahorro',
            cantidad: 0,
            cuenta: { id: 0, descripcion: 'null' },
            disabled: true,
            comentario: '',
            cuentas: [
                { id: 0, descripcion: '--elegir--' },
                { id: 1, descripcion: 'Retenciones' },
                { id: 2, descripcion: 'Banamex' }
            ]
        };
    }

    addNewAhorro() {
        var newMovimiento = prompt('Cantidad');

        this.setState({
            tipo: this.state.tipo,
            cantidad: newMovimiento
        });
    }

    setTipoMovimiento(e) {
        console.log('setmovimiento');
        var value = e.target.value;
        var tipo = e.target.getAttribute('id');

        this.setState({
            tipo: tipo,
            cantidad: this.state.cantidad
        });
    }

    saveMovimiento(e) {
        console.log('en save ->' + e);

    }

    selectChanged(e) {
        console.log(e.target.value);
        var selectedAccountValue = e.target.value;

        for (let index = 0; index < this.state.cuentas.length; index++) {
            const element = this.state.cuentas[index];

            if (element.id == selectedAccountValue) {
                console.log(element);
                this.setState({
                    cuenta: element
                });
            }
        }

    }

    handleBlurComentario(e) {
        console.log('blur comentario');

        var comentario = e.target.value;

        console.log(comentario);

        this.setState({
            comentario: comentario
        });
    }

    handleMontoChange(e) {
        console.log('en monto change');
        var monto = e.target.value;
        console.log('monto -> ' + monto);

        this.setState({
            cantidad: monto
        });
    }

    render() {

        const cuentas = this.state.cuentas.map((e, index) => {
            return (
                <option key={index} value={index}>{e.descripcion}</option>
            );
        });

        const btnSave = !(parseFloat(this.state.cantidad) >0 && this.state.cuenta.id !=0);

        return (
            <div>
                <div className="form-group">
                    <label htmlFor='selectCuenta'>Cuenta</label>
                    <select
                        className="form-control"
                        id='selectCuenta'
                        name='cuenta'
                        onChange={(e) =>
                            this.selectChanged(e)}
                    >
                        {cuentas}
                    </select>
                </div>
                <div className="form-check">
                    <label htmlFor='ahorro'>Ahorro</label>
                    <input
                        
                        onChange={(e) => this.setTipoMovimiento(e)}
                        type='radio' id='ahorro' name='tipo'></input>
                    
                    <label htmlFor='gasto'>Gasto</label>
                    <input onChange={(e) => this.setTipoMovimiento(e)}
                        type='radio' id='gasto' name='tipo'></input>
                </div>
            <div className="form-group">
                <label htmlFor='monto'>Monto</label>
                    <input
                        className="form-control"
                        type='text' id='monto'
                    onChange={(e) => this.handleMontoChange(e)}
                ></input>
                </div>

                <div className="form-group">
                    <label htmlFor='comentario'>Comentario</label>
                    <input
                        className="form-control"
                        type='text' id='comentario'
                        onBlur={(e) => this.handleBlurComentario(e)}
                    ></input>
                </div>
                
                <button
                    disabled={btnSave}
                    className='btn'
                    onClick={(e) =>
                    this.props.onAddMovimiento(e, this.state)}
                >
                    Save
            </button>
                <div className="form-group">
                    <p className='lead'>
                        <div>
                        Tipo {this.state.tipo} 
                        </div>
                        <div>
                        Cantidad: ${this.state.cantidad}
                        </div>
                        <div>
                        Cuenta: {this.state.cuenta.id}
                        </div>
                        <div>
                            Comentario: {this.state.comentario}
                        </div>
                    </p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <AhorrosApp />,
    document.getElementById('main')
);