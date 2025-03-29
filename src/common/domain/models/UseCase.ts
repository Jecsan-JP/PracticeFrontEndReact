export interface UseCase<T, R> {
    execute(t: T): Promise<R>
}