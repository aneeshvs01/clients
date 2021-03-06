import React from 'react';
import { connect } from 'react-redux';

import { Nav } from '../../Components/Nav';
import { PageHeader } from '../../Components/Header';
import ClientDetails from '../../Components/ClientDetails';
import ClientListItem from '../../Components/ClientListItem';
import { clientActions } from '../../store/_actions';

/**
 * Client listing page component
 * 
 * @class ClientsPage
 * @extends {Component}
 */
class ClientsPage extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			loading : props.clients.loading,
            clients : props.clients.clients,
            activeClient : {}
        }
    }
    
    //State updation with property updation
    componentWillReceiveProps = (props) => {
        this.setState({
            loading : props.clients.loading,
			clients : props.clients.clients,
        });
    }

    //Load clients on component mount
	componentDidMount = () => {
		this.props.dispatch(clientActions.loadClients());
	}
    
    //Set pressed list user as selected user
    showClient = (client) => {
        this.setState({
            activeClient : client
        });
    }

    /**
     * Filter data by string
     * 
     * @param {object} event input value change event
     * @returns null
     */
    filterData = (event) => {
        let filterBy = event.target.value;
        let data = this.props.clients.clients;

        if(filterBy != ''){
            data = data.filter(row => {
                let match = false;
                Object.keys(row).map(function(key){
                    if(row[key].toString().toLowerCase().indexOf(filterBy) > -1){
                        match = true;
                    }
                })

                return match;
            })
        }

        this.setState({
            clients : data
        })
    }
    
	render() {
		return (
			<div id="wrapper">
				<Nav location={this.props.location} />
				<div id="page-wrapper" className="gray-bg">
					<PageHeader title="Clients" crumbTitle="Clients" />
					
                    <div className="wrapper wrapper-content animated fadeInRight ecommerce">
						<div className="row">
                                
                            <div className="col-sm-8">
                                <div className="ibox">
                                    <div className="ibox-content">
                                        <h2>Clients</h2>
                                        <div className="input-group">
                                            <input type="text" placeholder="Search client" onChange={this.filterData} className="input form-control" />
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn btn-primary"> <i className="fa fa-search"></i> Search</button>
                                            </span>
                                        </div>
                                        <div className="clients-list">
                                            <ul className="nav nav-tabs">
                                                <span className="pull-right small text-muted">{this.state.clients.length} items</span>
                                            </ul>
                                        </div>
                                        
                                        <div className="tab-content">
                                            <div id="tab-1" className="tab-pane active">
                                                <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '100%'}}>
                                                    <div className="full-height-scroll" style={{overflow: 'hidden', width: 'auto', height: '100%'}}>
                                                        <div className="table-responsive">
                                                            {this.state.clients.length == 0 && (
                                                                <p style={{textAlign: 'center', marginTop: '10px'}}>No clients found!</p>
                                                            )}
                                                            <table className="table table-striped table-hover">
                                                                <tbody>
                                                                    {this.state.clients.map((client, key) => 
                                                                        <ClientListItem
                                                                            key={key} 
                                                                            client={client} 
                                                                            showClient={(client) => this.showClient(client)} />
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="slimScrollBar" style={{
                                                        background: 'rgb(0, 0, 0)',
                                                        width: '7px',
                                                        position: 'absolute',
                                                        top:' 0px',
                                                        opacity: '0.4',
                                                        display: 'none',
                                                        borderRadius: '7px',
                                                        zIndex: 99,
                                                        right: '1px',
                                                        height: '365.112px'}}></div>
                                                    <div className="slimScrollRail" style={{
                                                        width: '7px',
                                                        height: '100%',
                                                        position: 'absolute', top: '0px', 
                                                        display: 'none', 
                                                        borderRadius: '7px',
                                                        background: 'rgb(51, 51, 51)',
                                                        opacity: 0.2,
                                                        zIndex: 90,
                                                        right: '1px'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {Object.keys(this.state.activeClient).length > 0 && (
                                <ClientDetails client={this.state.activeClient} />
                            )}
                            
						</div>
					</div>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { clients } = state
	return {
		clients
	};
}

const connectedClientsPage = connect(mapStateToProps)(ClientsPage);
export { connectedClientsPage as ClientsPage };