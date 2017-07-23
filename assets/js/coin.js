var displayCoins = function (coin_str) {
    $('ul').append('<li>' + coin_str + '</li>');
};
$(function () {
    // clear feedback when input value changes
    $('input').on('input', function () {
        $('#feedback').removeClass('alert-danger').addClass('hidden').html('');
    });
    // form submission
    $('form').on('submit', function (e) {
        e.preventDefault();
        // set value
        Money.init($('input').val().trim())
            // validate
            .validate();
        // display error if available
        if (Money.error) {
            $('#feedback').addClass('alert-danger').removeClass('hidden').html(Money.error);
            return;
        }

        // show loading image and prepare list
        $('#feedback').addClass('alert-info').removeClass('hidden')
            .html('<img src="./assets/img/loading.gif" /><ul class="nav nav-stacked"></ul>');
        // convert to sterling coins
        Money.toSterlingCoins(displayCoins);

        $('#feedback').addClass('alert-success')
            .removeClass('alert-info')
            .find('img').remove();
    });
});