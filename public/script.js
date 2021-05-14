document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.tooltipped');
	var instances = M.Tooltip.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.fixed-action-btn');
	var instances = M.FloatingActionButton.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.collapsible');
	var instances = M.Collapsible.init(elems, {});
});
