
import React, { Component } from "react";
import { ipcRenderer, remote } from "electron";
// import logger from 'logger';
import { PageContent, Text, TableRow, TableCell, Table } from "nessie-ui";
import styles from "./urlList.css";

interface UrlListProps {
    list: any[],
    onRemove?: ( ...args: any[] ) => any,
    addTab?: ( ...args: any[] ) => any
}
export default class UrlList extends Component<UrlListProps, {}> {
    static defaultProps = {
        list: []
    };

    render = () => {
        const { addTab, list } = this.props;
        const parsedList = [];
        list.forEach( ( item, i ) => {
            const handleClick = e => {
                // required to prevent the app navigating by default.
                e.preventDefault();
                addTab( {
                    url: item,
                    isActiveTab: true
                } );
            };
            const listItem = (
                <TableRow align="left" verticalAlign="middle" gutters="S" key={i}>
                    <TableCell>
                        <a onClick={handleClick} href={item}>
                            {item}
                        </a>
                    </TableCell>
                </TableRow>
            );
            parsedList.push( listItem );
        } );
        return (
            <Table className={styles.table}>
                {parsedList}
                {!parsedList.length && (
                    <TableRow>
                        <TableCell>Nothing to see here yet.</TableCell>
                    </TableRow>
                )}
            </Table>
        );
    };
}
