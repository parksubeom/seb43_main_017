import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddListMusic = () => {
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    // const [coverImg, setCoverImg] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [coverImg, setCoverImg] = useState<string>('');

    /* 2023.05.21 마이플레이리스트 생성 */
    const MyplaylistCreate = () => {
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('body', body);
        // formData.append('coverImg', coverImg as File);
        axios
            .post(
                `http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/playlists`,
                {
                    title: title,
                    body: body,
                    coverImg: coverImg,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                },
            )
            .then((response) => {
                console.log(response);
                // setCoverImg(null);
                setCoverImg('');
                setTitle('');
                setBody('');
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <PlayListContainer>
            <MyplaylistTitle>
                <li>Add My Playlist</li>
            </MyplaylistTitle>
            <MyplaylistItem>
                <li>Playlist-CoverImg</li>
                <p>커버 이미지 url 주소를 넣어주세요.</p>
                {/* <input type="file" onChange={(e) => setCoverImg(e.target.files && e.target.files[0])} /> */}
                <input value={coverImg} onChange={(e) => setCoverImg(e.target.value)} />
                <li>Playlist-Title</li>
                <p>플레이리스트의 제목을 적어주세요.</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <li>Playlist-Content</li>
                <p>플레이리스트를 설명하는 글을 적어주세요.</p>
                <input value={body} onChange={(e) => setBody(e.target.value)} />
            </MyplaylistItem>
            <Submit>
                <button onClick={MyplaylistCreate}>submit</button>
            </Submit>
        </PlayListContainer>
    );
};

export default AddListMusic;

const PlayListContainer = styled.div`
    z-index: 3;
    width: 400px;
    height: 350px;
`;

const MyplaylistTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
        color: white;
        font-size: 20px;
        margin: 10px;
    }
`;

const MyplaylistItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;

    li {
        display: flex;
        align-items: center;
        color: white;
        margin: 10px 0px 10px 0px;
    }

    p {
        color: rgb(156, 156, 156);
        font-size: 12px;
        margin-bottom: 5px;
    }

    input {
        width: 400px;
        height: 20px;
        border: none;
        background-color: rgba(75, 75, 75, 0.8);
        color: white;
    }
    @media (max-width: 700px) {
        margin: 30px;

        input {
            width: 330px;
        }
    }
`;

const Submit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        width: 80px;
        height: 30px;
        margin: 10px;
        border-radius: 10px;
        background-color: #8f8f8f;
    }
`;