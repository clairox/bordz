type BoardDetailsViewProps = {
    board: Board
}
export const BoardDetailsView: React.FC<BoardDetailsViewProps> = ({
    board,
}) => {
    return (
        <ul className="flex flex-col gap-2 text-sm">
            <li className="line-clamp-1">{board.deck.title}</li>
            <li className="line-clamp-1">{board.trucks.title}</li>
            <li className="line-clamp-1">{board.wheels.title}</li>
            <li className="line-clamp-1">{board.bearings.title}</li>
            <li className="line-clamp-1">{board.hardware.title}</li>
            <li className="line-clamp-1">{board.griptape.title}</li>
        </ul>
    )
}
