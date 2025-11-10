// some help with co-pilot troubleshooting syntax, some help with michael
// main.js - JavaScript for GigTrack

document.addEventListener('DOMContentLoaded', function () {

    // Rating increase/decrease functionality
    function updateRatingControls(projectId, rating) {
        var valueEl = document.querySelector('.rating-value[data-project-id="' + projectId + '"]');
        if (valueEl) {
            valueEl.textContent = rating;
        }

        var incBtn = document.querySelector('.increase-rating[data-project-id="' + projectId + '"]');
        var decBtn = document.querySelector('.decrease-rating[data-project-id="' + projectId + '"]');

        if (incBtn) {
            incBtn.disabled = rating >= 10;
        }
        if (decBtn) {
            decBtn.disabled = rating <= 0;
        }
    }

    var ratingButtons = document.querySelectorAll('.rating-button');

    ratingButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project-id');
            const action = this.getAttribute('data-action');

            var valueEl = document.querySelector('.rating-value[data-project-id="' + projectId + '"]');
            var currentRaw = valueEl ? parseInt(valueEl.textContent || '0', 10) : 0;
            var current = isNaN(currentRaw) ? 5 : currentRaw;
            var optimistic = current;
            if (action === 'increment') {
                optimistic = Math.min(10, current + 1);
            } else if (action === 'decrement') {
                optimistic = Math.max(0, current - 1);
            }
            updateRatingControls(projectId, optimistic);

            fetch('/projects', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'projectId': projectId,
                    'action': action
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update project');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && typeof data.rating === 'number') {
                        updateRatingControls(projectId, data.rating);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        });
    });

    // initialize button disabled states based on current ratings
    document.querySelectorAll('.rating-value').forEach(function (valEl) {
        const projectId = valEl.getAttribute('data-project-id');
        const raw = parseInt(valEl.textContent || '0', 10);
        const rating = isNaN(raw) ? 5 : raw;
        updateRatingControls(projectId, rating);
    });

    // Delete button functionality
    var deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project-id');
            if (confirm('Are you sure you want to delete this project?')) {
                fetch('/projects', {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'projectId': projectId
                    })
                }).then(function (response) {
                    window.location.reload();
                });
            }
        });
    });
});

