/**
 * @flow
 */
import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import ExportDatabase from '../containers/ExportDatabase';
import ImportDatabase from './ImportDatabase';

import logo from '../assets/logo.png';

const tableTooltip = (
    <Tooltip id='table-tooltip'><strong>Create New Table</strong></Tooltip>
);

const trashTooltip = (
    <Tooltip id='trash-tooltip'><strong>Clear Current Schema</strong></Tooltip>
);


type Props = {
    dbName: string,
    dbModal: boolean,
    toggleDbModal: (editMode?: boolean) => void,
    toggleTableModal: () => void
};

class Header extends Component<Props> {
    constructor(props: Props) {
        super(props);

        if (!props.dbName && !props.dbModal) {
            props.toggleDbModal();
        }
    }

    shouldComponentUpdate(nextProps: Props) {
        // Update only if database name changes
        return this.props.dbName !== nextProps.dbName;
    }

    clearSchemaData = () => {
        window.localStorage.removeItem('schema');
        window.location.reload();
    }

    toggleDbModal = () => {
        const editMode = true;
        this.props.toggleDbModal(editMode);
    }

    render() {
        console.log('Header rendering'); // eslint-disable-line no-console
        const { dbName, toggleTableModal } = this.props;

        return (
            <header>
                <div className='container'>
                    <div className='row'>
                        <div className='title col-xs-5 col-sm-4 text-left'>
                            <img
                                src={ logo }
                                alt='logo'
                                height={ 40 }
                                style={ { paddingTop: 5 } }
                            />
                        </div>
                        <div className='db-name col-xs-5 col-sm-4 text-center'>
                            <span><i className='fa fa-database'></i> { dbName }</span>
                            { !!dbName &&
                                <sup>
                                    <button
                                        className='fa fa-edit'
                                        onClick={ this.toggleDbModal }
                                    >
                                    </button>
                                </sup>
                            }
                        </div>
                        <div className='menu col-xs-2 col-sm-4 text-right'>
                            <ul className='list-inline'>
                                <li>
                                    <OverlayTrigger
                                        placement='bottom'
                                        overlay={ tableTooltip }
                                        delayShow={ 300 }
                                        rootClose
                                    >
                                        <button
                                            className='fa fa-plus'
                                            onClick={ toggleTableModal }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>
                                <li>
                                    <OverlayTrigger
                                        placement='bottom'
                                        overlay={ trashTooltip }
                                        delayShow={ 300 }
                                        rootClose
                                    >
                                        <button
                                            className='fa fa-trash-o'
                                            onClick={ this.clearSchemaData }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>

                                <ExportDatabase />

                                <ImportDatabase />

                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
