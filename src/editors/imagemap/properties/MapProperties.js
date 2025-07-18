import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import { Form } from '@ant-design/compatible';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';

const { Panel } = Collapse;

class MapProperties extends Component {
	static propTypes = {
		canvasRef: PropTypes.any,
	};

	render() {
		const { canvasRef, form } = this.props;
		const showArrow = false;
		if (canvasRef) {
			return (
				<Scrollbar>
					<Form layout="horizontal">
						<Collapse bordered={false}>
							{Object.keys(PropertyDefinition.map).map(key => {
								return (
									<Panel key={key} header={PropertyDefinition.map[key].title} showArrow={showArrow}>
										{PropertyDefinition.map[key].component.render(
											canvasRef,
											form,
											canvasRef.handler.workarea,
										)}
									</Panel>
								);
							})}
						</Collapse>
					</Form>
				</Scrollbar>
			);
		}
		return null;
	}
}

export default Form.create({
	onValuesChange: (props, changedValues, allValues) => {
		const { onChange, selectedItem } = props;
		onChange(selectedItem, changedValues, { workarea: allValues });
	},
})(MapProperties);
