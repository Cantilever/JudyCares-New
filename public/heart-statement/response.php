<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Heart Statement | JudyCares</title>
	<link rel="stylesheet"  href="http://code.jquery.com/mobile/1.0b1/jquery.mobile-1.0b1.min.css" />
	<script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
	<script src="http://jquerymobile.com/test/experiments/themeswitcher/jquery.mobile.themeswitcher.js"></script>
	<script src="http://jquerymobile.com/test/docs/_assets/js/jqm-docs.js"></script>
	<script src="http://code.jquery.com/mobile/1.0b1/jquery.mobile-1.0b1.min.js"></script>
	<style>
		.jqm-themeswitcher { display: none; }
		
		#start-over { display: block; width: 60%; margin: 0 20%; }
		#home { width: 100%; overflow: hidden; }
		html { background: #dadada; }

		.portrait h1 { font-size: 2em; margin-top: 3em; text-align: center; }
		.landscape h1 { font-size: 3em; margin-top: .5em; text-align: center; }
		.min-width-768px.portrait h1 { margin-top: 2em; font-size: 6em; }
		.min-width-768px.landscape h1 { margin-top: 1.5em; font-size: 7em; }
	</style>
</head>
<body>
	<div data-role="page" id="home">
		<div data-role="content">
			<h1 id="header">I feel<br/><?php echo $_GET["message"]; ?></h1>
			<a href="/heart-statement/" id="start-over" rel="external" data-icon="arrow-l" data-role="button" data-theme="c">Start Again</a>
		</div>
	</div>
	
</body>
</html>