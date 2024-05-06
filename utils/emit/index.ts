class Emit {
    private EmitList = new Map()

    public on(key: any, fn: Function) {
        this.EmitList.set(key, fn)
    }

    public emit(key: any, args: any[]) {
        this.EmitList.get(key).call(this, ...args)
    }

    public off(key: string) {
        this.EmitList.delete(key)
    }
}

const emit = new Emit()

export {
    emit,
}