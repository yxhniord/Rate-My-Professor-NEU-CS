import {render, screen} from '@testing-library/react';
import {youtubeAPI, youtubeAPIKey} from "../../../constants/variables";
import About from "../About";

test('Test YouTube video',()=>{
    async function getYouTubePlaylistItems() {
        const res = await fetch(`${youtubeAPI}/search?part=snippet&type=video&q=northeastern+university&maxResults=5&key=${youtubeAPIKey}`);
        return await res.json();
    }

    let videoMetaInfo;
    let youtubeLoading;

    getYouTubePlaylistItems()
        .then((res) => {
            if (res?.error) {
                return;
            }
            const index = Math.floor(Math.random() * res.items.length);
            videoMetaInfo = res.items[index];
            youtubeLoading = false;
        })
        .then(() => {
            render(<About youtubeLoading={youtubeLoading} videoMetaInfo={videoMetaInfo} />);
            expect(screen.getByTitle('YouTube video player')).toBeInTheDocument();
        })
        .catch(err => {
            console.log(err);
        });
});