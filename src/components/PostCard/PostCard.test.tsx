import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';

import Provider from '../Provider/Provider';

import { PostCard } from './PostCard';
import { postMock } from './__mocks__/post.mock';

describe('PostCard component', () => {
    it('Отображение кнопки "Показать все", если  длина > 356 символов', async () => {
        const longContentPost = { ...postMock, content: 'a'.repeat(357) };

        render(
            <Provider>
                <PostCard post={longContentPost} />
            </Provider>
        );

        expect(await screen.findByText(/Показать все/i)).toBeInTheDocument();
    });

    it('Отображение всего контента поста (длина <= 356 символов)', async () => {
        const longContentPost = { ...postMock, content: 'a'.repeat(356) };

        render(
            <Provider>
                <PostCard post={longContentPost} />
            </Provider>
        );
        expect(screen.queryByText(/Показать все/i)).not.toBeInTheDocument();
    });

    it('Нажатие на кнопку "Показать все" и "Скрыть все"', async () => {
        const longContentPost = { ...postMock, content: 'a'.repeat(600) };

        render(
            <Provider>
                <PostCard post={longContentPost} />
            </Provider>
        );

        expect(await screen.findByText(/Показать все/i)).toBeInTheDocument();

        act(() => {
            fireEvent.click(screen.getByText('Показать все'));
        });

        expect(await screen.findByText(/Скрыть все/i)).toBeInTheDocument();

        act(() => {
            fireEvent.click(screen.getByText('Скрыть все'));
        });

        expect(await screen.findByText(/Показать все/i)).toBeInTheDocument();
    });

    it('Отображение лайков у поста', async () => {
        render(
            <Provider>
                <PostCard post={postMock} />
            </Provider>
        );
        const likeButton = screen.getByTestId('like');

        expect(likeButton).toBeInTheDocument();

        expect(likeButton.getElementsByTagName('p')[0].textContent).toBe('1');
    });
});
