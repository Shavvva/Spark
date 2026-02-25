// Добавьте в раздел <script> или как отдельный файл
const GITHUB_TOKEN = 'your_token_here'; // Настройте в Secrets
const REPO_OWNER = 'your_username';
const REPO_NAME = 'secure-messenger';
const FILE_PATH = 'data/messages.json';

async function pushToGitHub(encryptedData) {
    const content = btoa(JSON.stringify(encryptedData));
    
    // Получаем текущий SHA файла
    const getRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        }
    );
    
    const fileData = await getRes.json();
    const sha = fileData.sha;
    
    // Обновляем файл
    await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Update messages ${new Date().toISOString()}`,
                content: content,
                sha: sha
            })
        }
    );
}
