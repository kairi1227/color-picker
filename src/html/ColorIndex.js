import React from 'react';
import './color.css';
import ColorCircle from './circle/ColorCircle';
import SaturationCircle from './circle/SaturationCircle';
import Brightness from './circle/BrightnessCircle';
import {hslToRgb, colorPicker} from '../component/common';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			color: {htmlColor: '#ff0000', rgb: {r: 255, g: 0, b: 0}, hsl: {h: 0, s: 0.5, l: 0.5}},
			saturation: 4300,
			brightness: 50,
			btnBg: {
				colorBg: require('./images/btn_color.png'),
				saturationBg: require('./images/btn_saturation.png'),
				brightnessBg: require('./images/btn_brightness.png'),
				normalBg: require('./images/btn_normal.png')
			},
			selected: 'colorBg'
		}
	}

	componentWillMount() {
		document.title = 'Meeting Room';
	}

	render() {
		const {color, btnBg, selected} = this.state;
		return (
			<div className={'color-circle'}>
				<div className={'color-circle-btn'}>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'colorBg'})}
					     style={{background: `url(${btnBg[selected === 'colorBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Color</span>
					</div>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'saturationBg'})}
					     style={{background: `url(${btnBg[selected === 'saturationBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Saturability</span>
					</div>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'brightnessBg'})}
					     style={{background: `url(${btnBg[selected === 'brightnessBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Brightness</span>
					</div>
				</div>
				<div style={{display: selected === 'colorBg' ? 'block' : 'none'}}>
					<ColorCircle color={color} onChange={v => this.setState({color: v})}/>
				</div>
				<div style={{display: selected === 'saturationBg' ? 'block' : 'none'}}>
					<SaturationCircle color={color} onChange={v => this.setState({color: v})}/>
				</div>
				<div style={{display: selected === 'brightnessBg' ? 'block' : 'none'}}>
					<Brightness onChange={v => {
						color.hsl.l = v;
						const rgb = hslToRgb({...color.hsl});
						const htmlColor = colorPicker(rgb);
						this.setState({brightness: v, color: {htmlColor, hsl: {...color.hsl, l: v}, rgb}});
					}}/>
				</div>
			</div>
		);
	}

}