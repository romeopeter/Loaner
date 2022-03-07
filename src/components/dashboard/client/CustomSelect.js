import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function CustomSelect(props) {
	if (props.allowSelectAll) {
		return (
			<Select
				{...props}
				options={[props.allOption, ...props.options]}
				onChange={(selected, event) => {
					if (selected !== null && selected.length > 0) {
						if (
							selected[selected.length - 1].value ===
							props.allOption.value
						) {
							return props.onChange([
								props.allOption,
								...props.options,
							]);
						}
						let result = [];
						if (selected.length === props.options.length) {
							if (selected.includes(props.allOption)) {
								result = selected.filter(
									(option) =>
										option.value !== props.allOption.value
								);
							} else if (event.action === "select-option") {
								result = [props.allOption, ...props.options];
							}
							return props.onChange(result);
						}
					}

					return props.onChange(selected);
				}}
			/>
		);
	}

	return <Select {...props} />;
}

CustomSelect.propTypes = {
	loadInvestorsFunc: PropTypes.func,
	value: PropTypes.any,
	onChange: PropTypes.func,
	allowSelectAll: PropTypes.bool,
	allOption: PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	}),
};

CustomSelect.defaultProps = {
	allOption: {
		label: "Select all",
		value: "*",
	},
};

export default CustomSelect;