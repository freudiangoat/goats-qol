Hooks.on("renderChatMessage", (msg, html, data) => {
    if (!msg.isRoll) {
        return;
    }

    const newTerms = msg.roll.terms
        .filter(t => t instanceof NumericTerm && t.flavor && t.flavor !== "")
        .map(t => {
            return {
                formula: t.number,
                flavor: t.flavor,
                total: t.number,
                rolls: []
            };
        });

    const newHtml = $(_templateCache["templates/dice/tooltip.html"](
        {
            parts: newTerms
        },
        {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }));

    const numberEntries = newHtml.find(".tooltip-part");
    html.find(".dice-tooltip").append(numberEntries);
});