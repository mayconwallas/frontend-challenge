import { Link } from '@tanstack/react-router'

import {
  useConfirmOrder,
  useOrder,
  useRejectOrder,
} from '@/features/orders'

interface OrderPageProps {
  orderId: string
}

const statusLabels = {
  pending: 'Pagamento pendente',
  confirmed: 'Compra confirmada',
  rejected: 'Pagamento recusado',
}

export function OrderPage({
  orderId,
}: OrderPageProps) {
  const orderQuery = useOrder(orderId)
  const confirmOrderMutation =
    useConfirmOrder(orderId)
  const rejectOrderMutation =
    useRejectOrder(orderId)

  if (orderQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <p>Carregando pedido...</p>
      </main>
    )
  }

  if (orderQuery.isError) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">
          Pedido não encontrado
        </h1>

        <Link
          to="/"
          className="mt-6 inline-block text-primary"
        >
          Voltar ao catálogo
        </Link>
      </main>
    )
  }

  const order = orderQuery.data.order

  const isUpdating =
    confirmOrderMutation.isPending ||
    rejectOrderMutation.isPending

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="border border-border p-6 sm:p-8">
        <p className="text-sm text-muted-foreground">
          Pedido
        </p>

        <h1 className="mt-1 break-all text-2xl font-semibold">
          {order.id}
        </h1>

        <div className="mt-6 border-y border-border py-5">
          <span className="text-sm text-muted-foreground">
            Status
          </span>

          <p className="mt-1 text-lg font-semibold text-primary">
            {statusLabels[order.status]}
          </p>

          {order.transactionId && (
            <div className="mt-4">
              <span className="text-sm text-muted-foreground">
                ID da transação
              </span>

              <p className="mt-1 break-all text-sm">
                {order.transactionId}
              </p>
            </div>
          )}
        </div>

        {order.status === 'pending' && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold">
              Processar pagamento
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Simule o resultado do processamento do
              pagamento.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  confirmOrderMutation.mutate()
                }
                className="bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50"
              >
                {confirmOrderMutation.isPending
                  ? 'Confirmando...'
                  : 'Confirmar pagamento'}
              </button>

              <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  rejectOrderMutation.mutate()
                }
                className="border border-border px-5 py-3 font-medium text-foreground disabled:opacity-50"
              >
                {rejectOrderMutation.isPending
                  ? 'Recusando...'
                  : 'Recusar pagamento'}
              </button>
            </div>

            {(confirmOrderMutation.isError ||
              rejectOrderMutation.isError) && (
              <p
                role="alert"
                className="mt-3 text-sm text-red-500"
              >
                Não foi possível atualizar o pedido.
              </p>
            )}
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Colecionador
          </h2>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt>Nome</dt>
              <dd>{order.customer.name}</dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt>E-mail</dt>
              <dd>{order.customer.email}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Carteira
          </h2>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt>Rede</dt>

              <dd className="capitalize">
                {order.wallet.network}
              </dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt>Endereço</dt>

              <dd className="break-all text-muted-foreground">
                {order.wallet.address}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            NFTs
          </h2>

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.nftId}
                className="flex items-center gap-4 border-b border-border pb-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-20 w-20 rounded-md object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <p className="text-sm">
                  {item.priceEth} ETH
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Resumo da compra
          </h2>

          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt>Subtotal</dt>
              <dd>{order.totals.subtotalEth} ETH</dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt>Desconto</dt>

              <dd>
                − {order.totals.discountEth} ETH
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt>Taxa de rede</dt>

              <dd>
                {order.totals.networkFeeEth} ETH
              </dd>
            </div>

            <div className="flex justify-between gap-4 border-t border-border pt-4 text-base font-semibold">
              <dt>Total</dt>
              <dd>{order.totals.totalEth} ETH</dd>
            </div>
          </dl>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Criado em{' '}
          {new Date(order.createdAt).toLocaleString(
            'pt-BR',
          )}
        </p>
      </div>
    </main>
  )
}