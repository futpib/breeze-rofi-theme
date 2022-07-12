
module.exports = ({
	breeze,
	alpha,
	mix,
	overlay,
}) => ({
	// selected-normal-foreground:	rgba ( 255, 255, 255, 100 % );
	'selected-normal-foreground': breeze.Window.ForegroundNormal,

	// foreground: rgba ( 193, 193, 193, 100 % );
	'foreground': breeze.Window.ForegroundNormal,

	// normal-foreground: @foreground;
	'normal-foreground': 'foreground',

	// alternate-normal-background: rgba ( 39, 50, 56, 100 % );
	'alternate-normal-background': breeze.Window.BackgroundNormal,

	// red: rgba ( 220, 50, 47, 100 % );
	'red': breeze.Window.ForegroundNegative,

	// selected-urgent-foreground:	rgba ( 255, 24, 68, 100 % );
	'selected-urgent-foreground': breeze.Window.ForegroundNegative,

	// blue: rgba ( 38, 139, 210, 100 % );
	'blue': breeze.Window.ForegroundActive,

	// urgent-foreground: rgba ( 255, 24, 68, 100 % );
	'urgent-foreground': breeze.Window.ForegroundNegative,

	// alternate-urgent-background: rgba ( 39, 50, 56, 100 % );
	'alternate-urgent-background': breeze.Window.BackgroundNormal,

	// active-foreground: rgba ( 128, 203, 196, 100 % );
	'active-foreground': breeze.Window.ForegroundActive,

	// lightbg: rgba ( 238, 232, 213, 100 % );
	'lightbg': breeze.Window.BackgroundNormal,

	// selected-active-foreground:	rgba ( 128, 203, 196, 100 % );
	'selected-active-foreground': breeze.Window.ForegroundNormal,

	// alternate-active-background: rgba ( 39, 50, 56, 100 % );
	'alternate-active-background': breeze.Window.BackgroundNormal,

	// background: rgba ( 39, 50, 56, 100 % );
	'background': breeze.Window.BackgroundNormal,

	// bordercolor: rgba ( 39, 50, 56, 100 % );
	'bordercolor': breeze.Window.DecorationFocus,

	// alternate-normal-foreground: @foreground;
	'alternate-normal-foreground': 'foreground',

	// normal-background: rgba ( 39, 50, 56, 100 % );
	'normal-background': breeze.Window.BackgroundNormal,

	// lightfg: rgba ( 88, 104, 117, 100 % );
	'lightfg': breeze.Window.ForegroundNormal,

	// selected-normal-background:	rgba ( 57, 66, 73, 100 % );
	'selected-normal-background': breeze.Window.DecorationFocus,

	// border-color: @foreground;
	'border-color': 'foreground',

	// separatorcolor: rgba ( 30, 37, 41, 100 % );
	'separatorcolor': breeze.Window.BackgroundNormal,

	// urgent-background: rgba ( 39, 50, 56, 100 % );
	'urgent-background': breeze.Window.BackgroundNormal,

	// selected-urgent-background:	rgba ( 57, 66, 73, 100 % );
	'selected-urgent-background': breeze.Window.BackgroundNormal,

	// alternate-urgent-foreground: @urgent-foreground;
	'alternate-urgent-foreground': 'urgent-foreground',

	// background-color: rgba ( 0, 0, 0, 0 % );
	'background-color': breeze.Window.BackgroundNormal,

	// alternate-active-foreground: @active-foreground;
	'alternate-active-foreground': 'active-foreground',

	// active-background: rgba ( 39, 50, 56, 100 % );
	'active-background': breeze.Window.BackgroundNormal,

	// selected-active-background:	rgba ( 57, 66, 73, 100 % );
	'selected-active-background': breeze.Window.DecorationFocus,
});
