document.getElementById('projectForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const language = this.language.value;
    const skillLevel = this.skillLevel.value;
    const timeframe = this.timeframe.value;

    const requestData = {
        language,
        skillLevel,
        timeframe
    };

    try {
        const response = await fetch('http://localhost:8080/api/projects/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        const ideaList = document.getElementById('ideaList');
        ideaList.innerHTML = '';

        data.projectIdeas.forEach(idea => {
            const match = idea.match(/\*\*(.+?)\*\*:\s*(.+)/);
            let title, description;

            if (match) {
                title = match[1];
                description = match[2];
            } else {
                title = "Untitled";
                description = idea;
            }

            const card = document.createElement('div');
            card.className = 'idea-card';

            const header = document.createElement('h3');
            header.textContent = title;

            const para = document.createElement('p');
            para.textContent = description;

            card.appendChild(header);
            card.appendChild(para);
            ideaList.appendChild(card);
        });

        document.getElementById('results').classList.remove('hidden');

    } catch (error) {
        alert('Error fetching project ideas: ' + error.message);
        console.error(error);
    }
});
