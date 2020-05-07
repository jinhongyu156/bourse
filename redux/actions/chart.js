import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CHART_HEADERDROPDOWNINDEX = "ACTIONS_SET_CHART_HEADERDROPDOWNINDEX";
export const ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX = "ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX";
export const ACTIONS_SET_CHART_ORDERPARAMSTABINDEX = "ACTIONS_SET_CHART_ORDERPARAMSTABINDEX";
/* action create */
// 设置 headerDropdownIndex
export function setHeaderDropdownIndex( headerDropdownIndex )
{
	return { type: ACTIONS_SET_CHART_HEADERDROPDOWNINDEX, payload: headerDropdownIndex };
};

// 设置 orderParamsDropdownIndex
export function setOrderParamsDropdownIndex( orderParamsDropdownIndex )
{
	return { type: ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX, payload: orderParamsDropdownIndex };
};

// 设置 orderParamsTabIndex
export function setOrderParamsTabIndex( orderParamsTabIndex )
{
	return { type: ACTIONS_SET_CHART_ORDERPARAMSTABINDEX, payload: orderParamsTabIndex };
};
