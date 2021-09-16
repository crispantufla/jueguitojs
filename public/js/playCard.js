async function playCard(card) {
    fetch(`/playCard/${card}`, { method: 'POST' }).then(location.reload())
}
