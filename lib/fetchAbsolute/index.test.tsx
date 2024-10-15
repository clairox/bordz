import fetchAbsolute from '.'

global.fetch = vi.fn()

describe('fetchAbsolute', () => {
    beforeEach(() => {
        process.env.NEXT_PUBLIC_BASE_API_URL = 'http://domain.com/api'
    })

    it('calls fetch with correct inputs', async () => {
        await fetchAbsolute('/test')
        expect(global.fetch).toHaveBeenCalledWith(
            'http://domain.com/api/test',
            undefined
        )

        await fetchAbsolute('http://other.net/api/test')
        expect(global.fetch).toHaveBeenCalledWith(
            'http://other.net/api/test',
            undefined
        )
    })

    it('throws an error if the input is not a valid pathname or url', async () => {
        const action = async () => {
            await fetchAbsolute('test')
        }

        expect(action).rejects.toThrow('Invalid URL')
    })

    it('throws an error if NEXT_PUBLIC_BASE_API_URL is not defined', async () => {
        delete process.env.NEXT_PUBLIC_BASE_API_URL

        const action = async () => {
            await fetchAbsolute('/test')
        }

        await expect(action).rejects.toThrow(
            'NEXT_PUBLIC_BASE_API_URL is not defined'
        )
    })
})
